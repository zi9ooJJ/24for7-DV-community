import { postModel, categoryModel } from "../db";

class PostService {
  constructor(PostModel, CategoryModel) {
    this.postModel = PostModel;
    this.categoryModel = CategoryModel;
    this.getPartial = this.getPartial.bind(this);
    this.addPost = this.addPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getPostsByCategory = this.getPostsByCategory.bind(this);
    this.getMyPosts = this.getMyPosts.bind(this);
    this.getPostsByTitleSearching = this.getPostsByTitleSearching.bind(this);
    this.getPost = this.getPost.bind(this);
    this.setPost = this.setPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  getPartial(posts) {
    const partialPosts = posts.map(post => {
      const { _id, title, userId, categoryId } = post;
      const { id, email, role } = userId;
      return {
        _id,
        title,
        categoryId: { _id: categoryId.id, title: categoryId.title },
        userId: { _id: id, email, role },
      };
    });
    return partialPosts;
  }

  async addPost(postInfo) {
    // 게시글 동일 제목 허용
    const createdNewPost = await this.postModel.create(postInfo);
    return createdNewPost;
  }

  async getPosts() {
    const posts = await this.postModel.findAll();
    const partialPosts = this.getPartial(posts);
    return partialPosts;
  }

  async getPostsByCategory(categoryId) {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new Error(`해당 카테고리가 존재하지 않습니다.`);
    }

    const posts = await this.postModel.findAllByCategory(categoryId);
    const partialPosts = this.getPartial(posts);
    return partialPosts;
  }

  async getMyPosts(userId) {
    const posts = await this.postModel.findAllByUser(userId);
    const partialPosts = posts.map(post => {
      const { _id, title, categoryId } = post;
      const categoryTitle = categoryId.title;
      return { _id, title, categoryId, categoryTitle };
    });
    return partialPosts;
  }

  async getPostsByTitleSearching(search) {
    const reg = new RegExp(search.trim(), "i");
    const posts = await this.postModel.findAllByTitleSearching(reg);
    const partialPosts = this.getPartial(posts);
    return partialPosts;
  }

  async getPost(postId) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new Error(`존재하지 않는 게시글입니다.`);
    }

    const partialPost = this.getPartial([post])[0];
    partialPost.contents = post.contents;
    return partialPost;
  }

  async setPost(user, postId, toUpdate) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new Error(`존재하지 않는 게시글입니다.`);
    }

    const { userId, role } = user;
    // 관리자 또는 글쓴이가 아니라면 수정 권한 없음
    if (post.userId._id != userId && role !== "admin") {
      throw new Error(`게시글을 수정할 권한이 없습니다.`);
    }

    const { modifiedCount } = await this.postModel.updateById(postId, toUpdate);
    if (modifiedCount === 0) {
      return { result: `수정된 내용이 없습니다.` };
    }
    return { result: `수정이 완료 되었습니다.` };
  }

  async deletePost(user, postId) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new Error(`존재하지 않는 게시글입니다.`);
    }

    const { userId, role } = user;
    // 관리자 또는 글쓴이가 아니라면 삭제 권한 없음
    if (post.userId._id != userId && role !== "admin") {
      throw new Error(`게시글을 삭제할 권한이 없습니다.`);
    }

    const { modifiedCount } = await this.postModel.softDeleteById(postId);
    if (modifiedCount === 0) {
      return { result: `게시글 삭제에 실패했습니다.` };
    }
    return { result: `게시글 삭제를 완료하였습니다.` };
  }
}

const postService = new PostService(postModel, categoryModel);

export { postService };
