import { GoodsBoxComponent } from './goods-box/goods-box.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaceBoxComponent } from './facebook-box/facebook-box.component';
import { OrderBoxComponent } from './order-box/order-box.component';
import { GoodsBox2Component } from './goods-box2/goods-box2.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AddressBoxComponent } from './address-box/address-box.component';

@NgModule({
  declarations: [
    GoodsBoxComponent,
    FaceBoxComponent,
    OrderBoxComponent,
    GoodsBox2Component,
    AddressBoxComponent,
   
  ],
  exports: [
    GoodsBoxComponent,
    FaceBoxComponent,
    OrderBoxComponent,
    GoodsBox2Component,
    AddressBoxComponent
  ],
  imports: [
    NgZorroAntdModule,
    RouterModule,
    LazyLoadImageModule,
    CommonModule,
    TranslateModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [


  ]
})
export class SharedModule { }