import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { Category, CategoryDocument } from "../models/category.schema";

@Injectable()
export class CategoriesRepository {

  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);

    await category.save();

    return category;
  }

  async findByName(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findById(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
    return this.categoryModel.update({ _id: id}, {$set: updateCategoryDto})
  }
}