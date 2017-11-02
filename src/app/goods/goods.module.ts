import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GoodsComponent } from './goods.component';
import { GoodsRoutes as routes } from './goods.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AllmodelComponent } from './allmodel/allmodel.component';
import { SharedModule } from '../shared/shared.module';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { ModelComponent } from './model/model.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    // components
    GoodsComponent,
    AllmodelComponent,
    AllCategoriesComponent,
    ModelComponent,
    GoodsListComponent,
    CategoriesComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
    CommonModule,
    TranslateModule,
    NgZorroAntdModule,
    FormsModule, ReactiveFormsModule 
  ],
  providers: [


  ]
})
export class GoodsModule { }