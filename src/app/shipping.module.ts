import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ShippingComponent } from './shipping/shipping.component';
import { CartService } from './cart.service';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'shipping', component: ShippingComponent, canDeactivate:[CartService]},
    ])
  ],
  declarations: [
    ShippingComponent
  ],
  exports: [
      ShippingComponent
  ]
})
export class ShippingModule { }