import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/shopping-mall-api'),
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}