import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, finalize } from 'rxjs/operators';
import { IHttpResponse, IProduct } from 'src/app/core/models';
import { SpinnerService } from 'src/app/core/components/spinner/spinner.service';
import { NotificationService, ProductService } from 'src/app/core/services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject<void>();
  productForm: FormGroup;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  onSave() {
    if (this.productForm.valid) {
      const data: IProduct = { ...this.productForm.value };

      this.spinnerService.show();

      this.productService
        .save(data)
        .pipe(
          finalize(() => this.spinnerService.hide()),
          takeUntil(this.destroyed$)
        )
        .subscribe(
          (response: IHttpResponse) => {
            if (response.status) {
              this.notificationService.success(response.message);
              this.router.navigateByUrl('/product/manage');
            } else {
              this.notificationService.error(response.message);
            }
          },
          (err: IHttpResponse) => {
            this.notificationService.error(
              (err && err.message) || 'Something went wrong'
            );
          }
        );
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
