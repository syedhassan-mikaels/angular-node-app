import {
  TestBed,
  async,
  fakeAsync,
  ComponentFixture,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './core/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  RouterLinkDirectiveStub,
  RouterStubsModule,
} from './testing/router-link-directive-stub';
import { AppModule } from './app.module';
import { PRODUCT_ROUTES } from './modules/product/product.route';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

let routerLinks: RouterLinkDirectiveStub[];
let linkDes: DebugElement[];
let router: Router;
let fixture: ComponentFixture<AppComponent>;
let comp: AppComponent;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        CoreModule,
        RouterTestingModule.withRoutes(PRODUCT_ROUTES),
        SharedModule,
        AppModule,
        RouterStubsModule,
      ],
      declarations: [AppComponent, RouterLinkDirectiveStub],
      providers: [HttpClientModule, { provide: APP_BASE_HREF, useValue: '/' }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
    //fixture = TestBed.createComponent(AppComponent);
    //router.navigateByUrl('/product/create');
  }));
  tests();

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('web');
  });
});

function tests() {
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  // #docregion test-setup
  beforeEach(() => {
    fixture.detectChanges(); // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map((de) => de.injector.get(RouterLinkDirectiveStub));
  });
}
