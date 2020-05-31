export interface IProduct {
  name: string;
  price: number;
}

export interface IProductList {
  records : IProduct[];
  totalRecords : number;
  pageCount: number;
  pageSize: number;
}
