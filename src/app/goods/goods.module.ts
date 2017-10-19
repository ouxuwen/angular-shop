import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GoodsComponent } from './goods.component';
import { GoodsRoutes as routes } from './goods.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AllmodelComponent } from './allmodel/allmodel.component';
import { SharedModule} from '../shared/shared.module';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { ModelComponent } from './model/model.component';
import { GoodsListComponent } from './goods-list/goods-list.component'
@NgModule({
    declarations: [
      // components
      GoodsComponent,
      AllmodelComponent,
      AllCategoriesComponent,
      ModelComponent,
      GoodsListComponent,
    ],
    exports: [
    ],
    imports: [
      SharedModule,
      RouterModule.forChild(routes),
      LazyLoadImageModule,
      CommonModule,
      TranslateModule
    ],
    providers: [
        
    
    ]
  })
  export class GoodsModule {}