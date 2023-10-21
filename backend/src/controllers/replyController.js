import { replyService } from "../services";

class ReplyController {
  constructor(ReplyService) {
    this.replyService = ReplyService;
    this.addReply = this.addReply.bind(this);
    this.getReplies = this.getReplies.bind(this);
    this.getRepliesByPost = this.getRepliesByPost.bind(this);
    this.getMyReplies = this.getMyReplies.bind(this);
    this.getReply = this.getReply.bind(this);
    this.setReply = this.setReply.bind(this);
    this.deleteReply = this.deleteReply.bind(this);
  }

  async addReply(req, res, next) {
    try {
      // replyInfo = { postId, parentId, contents}
      const replyInfo = req.body;
      replyInfo.userId = req.user.userId;
      const createdNewReply = await this.replyService.addReply(replyInfo);
      res.status(200).json(createdNewReply);
    } catch (error) {
      next(error.message);
    }
  }

  async getReplies(req, res, next) {
    try {
      const replies = await this.replyService.getReplies();
      res.status(200).json(replies);
    } catch (error) {
      next(error.message);
    }
  }

  // :postId
  // 선택한 게시글의 전체 댓글 조회 (삭제된 건 어떻게 처리?)
  // 댓글이랑 대댓글 어떻게 나눠서 넘기지?
  async getRepliesByPost(req, res, next) {
    try {
      const { postId } = req.params;
      const replies = await this.replyService.getRepliesByPost(postId);
      res.status(200).json(replies);
    } catch (error) {
      next(error.message);
    }
  }

  async getMyReplies(req, res, next) {
    try {
      const user = req.user;
      const replies = await this.replyService.getMyReplies(user.userId);
      res.status(200).json(replies);
    } catch (error) {
      next(error.message);
    }
  }

  async getReply(req, res, next) {
    try {
      const { replyId } = req.params;
      const reply = await this.replyService.getReply(replyId);
      res.status(200).json(reply);
    } catch (error) {
      next(error.message);
    }
  }

  async setReply(req, res, next) {
    try {
      const user = req.user;
      const { replyId } = req.params;
      const toUpdate = req.body;
      const newToUpdate = Object.fromEntries(
        Object.entries(toUpdate).filter(([key, value]) =>
          value ? toString(value).trim() : false,
        ),
      );
      const result = await this.replyService.setReply(
        user,
        replyId,
        newToUpdate,
      );
      res.status(200).json(result);
    } catch (error) {
      next(error.message);
    }
  }

  async deleteReply(req, res, next) {
    try {
      const user = req.user;
      const { replyId } = req.params;
      const result = await this.replyService.deleteReply(user, replyId);
      res.status(200).json(result);
    } catch (error) {
      next(error.message);
    }
  }
}

const replyController = new ReplyController(replyService);

export { replyController };
