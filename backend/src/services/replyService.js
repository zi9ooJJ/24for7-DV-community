import { replyModel, postModel } from "../db";

class ReplyService {
  constructor(ReplyModel, PostModel) {
    this.replyModel = ReplyModel;
    this.postModel = PostModel;
    this.getPartial = this.getPartial.bind(this);
    this.addReply = this.addReply.bind(this);
    this.getReplies = this.getReplies.bind(this);
    this.getRepliesByPost = this.getRepliesByPost.bind(this);
    this.getMyReplies = this.getMyReplies.bind(this);
    this.getReply = this.getReply.bind(this);
    this.setReply = this.setReply.bind(this);
    this.deleteReply = this.deleteReply.bind(this);
  }

  getPartial(replies) {
    const partialReplies = replies.map(reply => {
      const { _doc } = reply;
      const { isDeleted, deletedAt, ...partial } = _doc;
      return partial;
    });
    return partialReplies;
  }

  async addReply(replyInfo) {
    // replyInfo : { postId, parentId, contents, userId } + { isWriter }
    const post = await this.postModel.findById(replyInfo.postId);
    if (!post) {
      throw new Error(`댓글을 작성하려는 게시글이 존재하지 않습니다.`);
    }

    if (post.userId.id === replyInfo.userId) {
      replyInfo.isWriter = true;
    }

    const createdNewReply = await this.replyModel.create(replyInfo);
    return createdNewReply;
  }

  async getReplies() {
    const replies = await this.replyModel.findAll();
    const partialReplies = this.getPartial(replies);
    return partialReplies;
  }

  async getRepliesByPost(postId) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new Error(`존재하지 않는 게시글입니다.`);
    }

    const replies = await this.replyModel.findAllByPost(postId);

    // [질문] 이 부분(line56-106)은 백엔드보단 프론트에서 처리하는 게 좋을까요? line56-106
    // [질문] 비동기적이지 않은 부분은 프론트 쪽에서 처리하는 게 좋을까요?
    // 삭제된 댓글 중 대댓글이 달려 있는 것은 남기고, 대댓글이 달려있지 않거나 달린 대댓글이 모두 삭제된 경우 안 보냄
    let arrayReply = [];
    let arrayBoolean = [];
    for (let idx = 0; idx < replies.length; idx++) {
      if (replies[idx].parentId) {
        break;
      }

      const isDeleted = replies[idx].isDeleted;
      const { contents, ...partial } = replies[idx]._doc;

      arrayReply.push([
        { ...partial, contents: isDeleted ? "삭제된 댓글입니다." : contents },
      ]);
      arrayBoolean.push([isDeleted]);
    }

    let l = arrayBoolean.length;
    let temp = 0;
    for (let j = 0; j < l; j++) {
      let cnt = 0;
      for (let i = l + temp; i < replies.length; i++) {
        const parentId = replies[i].parentId;
        const replyId = replies[j]._id;

        if (JSON.stringify(parentId) !== JSON.stringify(replyId)) {
          break;
        }

        const isDeleted = replies[i].isDeleted;
        const { contents, ...partial } = replies[i]._doc;

        arrayReply[j].push({
          ...partial,
          contents: isDeleted ? "삭제된 댓글입니다." : contents,
        });
        arrayBoolean[j].push(isDeleted);
        cnt++;
      }
      temp += cnt;
    }

    l = arrayBoolean.length;
    for (let idx = 0; idx < l; idx++) {
      const setBoolean = JSON.stringify(Array.from(new Set(arrayBoolean[idx])));
      const isTrue = JSON.stringify(Array.from(new Set([true])));

      if (setBoolean === isTrue) {
        arrayReply.splice(idx, 1);
      }
    }

    return arrayReply;
  }

  async getMyReplies(userId) {
    const replies = await this.replyModel.findAllByUser(userId);
    const partialReplies = this.getPartial(replies);
    return partialReplies;
  }

  async getReply(replyId) {
    const reply = await this.replyModel.findById(replyId);
    if (!reply) {
      throw new Error(`존재하지 않는 댓글입니다.`);
    }
    const partialReply = this.getPartial([reply])[0];
    return partialReply;
  }

  async setReply(user, replyId, toUpdate) {
    const reply = await this.replyModel.findById(replyId);
    if (!reply) {
      throw new Error(`존재하지 않는 댓글입니다.`);
    }

    const { userId, role } = user;
    // 관리자 또는 댓글 작성자가 아니라면 수정 권한 없음
    if (reply.userId._id != userId && role !== "admin") {
      throw new Error(`댓글을 수정할 권한이 없습니다.`);
    }

    const { modifiedCount } = await this.replyModel.updateById(
      replyId,
      toUpdate,
    );
    if (modifiedCount === 0) {
      return { result: `댓글 수정에 실패했습니다.` };
    }
    return { result: `댓글 수정을 완료하였습니다.` };
  }

  async deleteReply(user, replyId) {
    const reply = await this.replyModel.findById(replyId);
    if (!reply) {
      throw new Error(`존재하지 않는 댓글입니다.`);
    }

    const { userId, role } = user;
    // 관리자 또는 댓글 작성자가 아니라면 삭제 권한 없음
    if (reply.userId._id != userId && role !== "admin") {
      throw new Error(`댓글을 삭제할 권한이 없습니다.`);
    }

    const { modifiedCount } = await this.replyModel.softDeleteById(replyId);
    if (modifiedCount === 0) {
      return { result: `댓글 삭제에 실패했습니다.` };
    }
    return { result: `댓글 삭제를 완료하였습니다.` };
  }
}

const replyService = new ReplyService(replyModel, postModel);

export { replyService };
