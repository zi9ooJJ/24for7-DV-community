import { model } from "mongoose";
import { postSchema } from "../schemas";

const Post = model("Post", postSchema);

class PostModel {
  async create(postInfo) {
    const createdNewPost = await Post.create(postInfo);
    return createdNewPost;
  }

  async findAll() {
    const posts = await Post.find({ isDeleted: false })
      .populate("userId")
      .populate("categoryId");
    return posts;
  }

  async findAllByCategory(categoryId) {
    const posts = await Post.find({ categoryId, isDeleted: false })
      .populate("userId")
      .populate("categoryId");
    return posts;
  }

  async findAllByUser(userId) {
    const posts = await Post.find({ userId, isDeleted: false }).populate(
      "categoryId",
    );
    return posts;
  }

  async findAllByTitleSearching(reg) {
    const posts = await Post.find({ title: { $regex: reg }, isDeleted: false })
      .populate("userId")
      .populate("categoryId");
    return posts;
  }

  async findById(id) {
    const post = await Post.findOne({ _id: id, isDeleted: false })
      .populate("userId")
      .populate("categoryId");
    return post;
  }

  async findByCategory(categoryId) {
    const post = await Post.findOne({ categoryId, isDeleted: false });
    return post;
  }

  async updateById(id, toUpdate) {
    const opts = { runValidators: true, omitUndefined: true };
    const updated = await Post.updateOne({ _id: id }, { $set: toUpdate }, opts);
    return updated;
  }

  async softDeleteById(id) {
    const deleted = await Post.updateOne(
      { _id: id },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
    );
    return deleted;
  }
}

const postModel = new PostModel();

export { postModel };
