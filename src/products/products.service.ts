import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { Category } from '../schemas/category.schema';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    title: string,
    description: string,
    SKU: string,
    price: number,
    categoryId: number,
  ): Promise<Product> {
    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    if (!/^[a-zA-Z0-9]{8}$/.test(SKU)) {
      throw new BadRequestException('SKU must be alpha-numeric and exactly 8 characters long');
    }
    const existingProduct = await this.productModel.findOne({ SKU }).exec();
    if (existingProduct) {
      throw new ConflictException('SKU must be unique');
    }

    const createdProduct = new this.productModel({ title, description, SKU, price, categoryId });
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findCategory(categoryId: number): Promise<Category | null> {
    return await this.categoriesService.findOne(categoryId);
  }
}
