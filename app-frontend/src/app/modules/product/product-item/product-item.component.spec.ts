import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IProduct } from 'src/app/core/models';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [RouterTestingModule, SharedModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component: Product', () => {
    expect(component).toBeTruthy();
  });

  it('Product Form invalid when empty', () => {
    expect(component.productForm.valid).toBeFalsy();
  });

  it('Prdouct Name field validity', () => {
    let errors = {};
    let name = component.productForm.controls['name'];
    expect(name.valid).toBeFalsy();

    // Name field is required
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set product name to something
    name.setValue('Basket');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Prdouct Price field validity', () => {
    let errors = {};
    let price = component.productForm.controls['price'];
    expect(price.valid).toBeFalsy();

    errors = price.errors || {};
    expect(errors['required']).toBeTruthy();

    price.setValue(10.99);
    errors = price.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Submitting a product form', () => {
    expect(component.productForm.valid).toBeFalsy();
    component.productForm.controls['name'].setValue('Basket');
    component.productForm.controls['price'].setValue(10.99);
    expect(component.productForm.valid).toBeTruthy();

    let product: IProduct = component.productForm.value;

    // Trigger the login function
    component.onSave();

    // Now we can check to make sure the emitted value is correct
    expect(product.name).toBe('Basket');
    expect(product.price).toBe(10.99);
  });
});
