import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() productData: any) {
    const { title, description, SKU, price, categoryId } = productData;
    const newProduct = new Product(
      this.productsService.findAll().length + 1,
      title,
      description,
      SKU,
      price,
      categoryId,
    );
    this.productsService.create(newProduct);
    return newProduct;
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (product) {
      return {
        ...product,
        category: this.productsService.findCategory(product.categoryId),
      };
    }
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productsService.remove(+id);
  }
}
