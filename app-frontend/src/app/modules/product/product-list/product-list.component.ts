import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/core/services';
import { takeUntil, finalize, tap } from 'rxjs/operators';
import { IHttpResponse, IProduct, IProductList } from 'src/app/core/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private readonly destroyed$ = new Subject<void>();
  progressIndicator = false;

  displayedColumns: string[] = ['name', 'price', 'created_at'];
  products: IProduct[] = [];
  paginate = {
    pageCount: 0,
    pageSize: 0,
    totalRecords: 0,
    pageNumber: 1,
  };

  tableFilter = {
    start_date: null,
    end_date: null,
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchAllProducts();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.paginate.pageNumber =
            (this.paginator && this.paginator.pageIndex + 1) ||
            this.paginate.pageNumber;
          this.fetchAllProducts();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchAllProducts() {
    this.progressIndicator = true;

    this.productService
      .getProducts({ offset: this.paginate.pageNumber, ...this.tableFilter })
      .pipe(
        finalize(() => (this.progressIndicator = false)),
        takeUntil(this.destroyed$)
      )
      .subscribe((response: IHttpResponse) => {
        const data = response.data as IProductList;
        if (data && data.records && data.records.length > 0) {
          this.products = data.records;
          this.paginate = {
            ...this.paginate,
            pageCount: data.pageCount,
            pageSize: data.pageSize,
            totalRecords: data.totalRecords,
          };
        } else {
          this.products = [];
          this.paginate = {
            ...this.paginate,
            pageCount: 0,
            totalRecords: 0,
          };
        }
      });
  }

  onChangeDate(
    filterType: string,
    type: string,
    event: MatDatepickerInputEvent<Date>
  ) {
    this.tableFilter[filterType] = moment(event.value).format('yy-MM-DD');
    this.paginator.pageIndex = 0;
    this.paginate.pageNumber = 1;
    this.fetchAllProducts();
  }

  clearDate(filterType: string) {
    if (this.tableFilter[filterType]) {
      this.tableFilter[filterType] = null;
      this.paginator.pageIndex = 0;
      this.paginate.pageNumber = 1;
      this.fetchAllProducts();
    }
  }
}
