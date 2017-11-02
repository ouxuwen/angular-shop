import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckOutComponent } from './check-out/check-out.component';
import { CartRoutes } from './cart.router';
import { HomeService } from '../services/home.service';



@NgModule({
  declarations: [
    // components
    CartComponent,
    CheckOutComponent,

  ],
  exports: [
  ],
  imports: [
    RouterModule.forChild(CartRoutes),
    LazyLoadImageModule,
    TranslateModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeService

  ]
})
export class CartModule { }
