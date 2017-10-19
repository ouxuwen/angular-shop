import { GoodsBoxComponent } from './goods-box/goods-box.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FaceBoxComponent } from './facebook-box/facebook-box.component'
@NgModule({
    declarations: [
      // components
GoodsBoxComponent,
FaceBoxComponent
    ],
    exports: [
        GoodsBoxComponent,
        FaceBoxComponent
    ],
    imports: [
      RouterModule,
      LazyLoadImageModule,
      CommonModule,
      TranslateModule,
      FormsModule,ReactiveFormsModule
    ],
    providers: [
        
    
    ]
  })
  export class SharedModule {}