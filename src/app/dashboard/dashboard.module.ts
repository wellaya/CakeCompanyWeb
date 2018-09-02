import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { SharedModule }       from '../shared/modules/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { routing }  from './dashboard.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { CakeOrderService } from './services/cake-order.service';

import { AuthGuard } from '../auth.guard';

import { CakeOrderComponent } from './cake-order/cake-order.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [RootComponent,HomeComponent,  CakeOrderComponent],
  exports:      [ ],
  providers:    [AuthGuard,CakeOrderService]
})
export class DashboardModule { }
