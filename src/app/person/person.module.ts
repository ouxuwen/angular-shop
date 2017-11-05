import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { PersonRouter as routes } from './person.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { MyBingComponent } from './my-bing/my-bing.component';
import { SharedModule } from '../shared/shared.module';
import { AddressComponent } from './address/address.component';
import { WishListComponent } from './wish-list/wish-list.component'
@NgModule({
    declarations: [
        PersonComponent,
        OrderComponent,
        MyBingComponent,
        AddressComponent,
        WishListComponent

    ],
    exports: [
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        LazyLoadImageModule,
        TranslateModule,
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [


    ]
})
export class PersonModule { }