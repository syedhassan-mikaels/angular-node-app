import { Directive, Input, HostListener } from '@angular/core';

// export for convenience.
export { RouterLink} from '@angular/router';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RouterLinkDirectiveStub
  ]
})
export class RouterStubsModule {}
