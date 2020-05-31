import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

const MODULES = [SharedModule];

const COMPONENTS = [HeaderComponent, SpinnerComponent];

@NgModule({
  declarations: [...COMPONENTS, ],
  imports: [CommonModule, ...MODULES],
  exports: [...COMPONENTS],
})
export class CoreModule {}
