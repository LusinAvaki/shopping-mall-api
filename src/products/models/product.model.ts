export class Product {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public SKU: string,
    public price: number,
    public categoryId: number,
  ) {}
}