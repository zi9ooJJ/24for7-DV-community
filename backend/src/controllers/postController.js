import { postService } from "../services";

class PostController {
  constructor(PostService) {
    this.postService = PostService;
    this.addPost = this.addPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getPostsByCategory = this.getPostsByCategory.bind(this);
    this.getMyPosts = this.getMyPosts.bind(this);
    this.getPostsByTitleSearching = this.getPostsByTitleSearching.bind(this);
    this.getPost = this.getPost.bind(this);
    this.setPost = this.setPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  async addPost(req, res, next) {
    try {
      const postInfo = req.body;
      postInfo.userId = req.user.userId;
      const createdNewPost = await this.postService.addPost(postInfo);
      res.status(200).json(createdNewPost);
    } catch (error) {
      next(error.message);
    }
  }

  async getPosts(req, res, next) {
    try {
      const posts = await this.postService.getPosts();
      res.status(200).json(posts);
    } catch (error) {
      next(error.message);
    }
  }

  async getPostsByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const posts = await this.postService.getPostsByCategory(categoryId);
      res.status(200).json(posts);
    } catch (error) {
      next(error.message);
    }
  }

  async getMyPosts(req, res, next) {
    try {
      const { userId } = req.user;
      const posts = await this.postService.getMyPosts(userId);
      res.status(200).json(posts);
    } catch (error) {
      next(error.message);
    }
  }

  async getPostsByTitleSearching(req, res, next) {
    try {
      const { search } = req.params;
      const posts = await this.postService.getPostsByTitleSearching(search);
      res.status(200).json(posts);
    } catch (error) {
      next(error.message);
    }
  }

  async getPost(req, res, next) {
    try {
      const { postId } = req.params;
      const posts = await this.postService.getPost(postId);
      res.status(200).json(posts);
    } catch (error) {
      next(error.message);
    }
  }

  async setPost(req, res, next) {
    try {
      const user = req.user;
      const { postId } = req.params;
      const toUpdate = req.body;
      const newToUpdate = Object.fromEntries(
        Object.entries(toUpdate).filter(([key, value]) =>
          value ? toString(value).trim() : false,
        ),
      );
      const result = await this.postService.setPost(user, postId, newToUpdate);
      res.status(200).json(result);
    } catch (error) {
      next(error.message);
    }
  }

  async deletePost(req, res, next) {
    try {
      const user = req.user;
      const { postId } = req.params;
      const result = await this.postService.deletePost(user, postId);
      res.status(200).json(result);
    } catch (error) {
      next(error.message);
    }
  }
}

const postController = new PostController(postService);

export { postController };
