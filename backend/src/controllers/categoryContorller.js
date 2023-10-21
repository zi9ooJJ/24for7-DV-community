import { categoryService } from "../services";

class CategoryController {
  constructor(CategoryService) {
    this.categoryService = CategoryService;
    this.addCategory = this.addCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async addCategory(req, res, next) {
    try {
      const categoryInfo = req.body;
      const newCategory = await this.categoryService.addCategory(categoryInfo);
      res.status(200).json(newCategory);
    } catch (error) {
      next(error.message);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await this.categoryService.getCategories();

      res.status(200).json(categories);
    } catch (error) {
      next(error.message);
    }
  }

  async getCategory(req, res, next) {
    try {
      const { categoryId } = req.params;

      const category = await this.categoryService.getCategory(categoryId);

      res.status(200).json(category);
    } catch (error) {
      next(error.message);
    }
  }

  async setCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const toUpdate = req.body;
      const newToUpdate = Object.fromEntries(
        Object.entries(toUpdate).filter(([key, value]) =>
          value ? toString(value).trim() : false,
        ),
      );
      const result = await categoryService.setCategory(categoryId, newToUpdate);
      res.status(200).json(result);
    } catch (error) {
      next(error.message);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const result = await this.categoryService.deleteCategory(categoryId);
      res.status(200).json(result);
    } catch (error) {
      next(error.message);
    }
  }
}

const categoryController = new CategoryController(categoryService);

export { categoryController };
