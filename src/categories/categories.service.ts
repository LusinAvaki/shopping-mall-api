import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  private initialCategories = [
    { title: 'Sweets', description: 'candies' },
    { title: 'Books', description: 'Psychology books' },
    { title: 'Electronics', description: 'phones' },
  ];

  async getNextCategoryId(): Promise<number> {
    const lastCategory = await this.categoryModel.findOne().sort({ id: -1 }).exec();
    return lastCategory ? lastCategory.id + 1 : 1;
  }

  async initializeCategories(): Promise<void> {
    const count = await this.categoryModel.countDocuments().exec();
    if (count === 0) {
      for (let i = 0; i < this.initialCategories.length; i++) {
        const id = i + 1;
        const { title, description } = this.initialCategories[i];
        const createdCategory = new this.categoryModel({
          id,
          title,
          description,
        });
        await createdCategory.save();
      }
    }
  }

  async onModuleInit() {
    await this.initializeCategories();
  }

  async create(title: string, description: string): Promise<Category> {
    const id = await this.getNextCategoryId();
    const createdCategory = new this.categoryModel({ id, title, description });
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findOne({ id }).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}