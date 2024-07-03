import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { Product } from './models/product.model';
import { Category } from './models/category.model';

@Injectable()
export class ProductsService {
  private categories: Category[] = [
    new Category(1, 'Sweets', 'candies'),
    new Category(2, 'Books', 'psychology'),
  ];

  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find(product => product.id === id);
  }

  create(product: Product) {
    if (!/^[a-zA-Z0-9]{8}$/.test(product.SKU)) {
      throw new BadRequestException('SKU must be alpha-numeric and exactly 8 characters long');
    }

    if (this.products.find(p => p.SKU === product.SKU)) {
      throw new ConflictException('SKU must be unique');
    }
    this.products.push(product);
  }

  remove(id: number) {
    this.products = this.products.filter(product => product.id !== id);
  }

  findCategory(id: number): Category {
    return this.categories.find(category => category.id === id);
  }
}
