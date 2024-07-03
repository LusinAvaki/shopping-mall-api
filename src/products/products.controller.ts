import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('SKU') SKU: string,
    @Body('price') price: number,
    @Body('categoryId') categoryId: number,
  ) {
    return this.productsService.create(
      title,
      description,
      SKU,
      price,
      categoryId,
    );
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (product) {
      const category = await this.productsService.findCategory(
        (await product).categoryId,
      );
      return { product, category };
    }
    return null;
  }
}