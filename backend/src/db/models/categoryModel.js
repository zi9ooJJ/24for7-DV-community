import { model } from "mongoose";
import { categorySchema } from "../schemas";

const Category = model("Category", categorySchema);

class CategoryModel {
  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async findById(id) {
    const category = await Category.findById(id);
    return category;
  }

  async findByTitle(title) {
    const category = await Category.findOne({ title });
    return category;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async updateById(id, toUpdate) {
    const opts = { runValidators: true, omitUndefined: true };
    const updated = await Category.updateOne(
      { _id: id },
      { $set: toUpdate },
      opts,
    );
    return updated;
  }

  async deleteById(id) {
    const deleted = await Category.deleteOne({ _id: id });
    return deleted;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
