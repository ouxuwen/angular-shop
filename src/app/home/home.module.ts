import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutes as routes } from './home.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule} from '../shared/shared.module'
@NgModule({
    declarations: [
      // components
      HomeComponent,

    ],
    exports: [
    ],
    imports: [
      SharedModule,
      RouterModule.forChild(routes),
      LazyLoadImageModule,
      CommonModule,
      TranslateModule,
      NgZorroAntdModule
    ],
    providers: [
        
    
    ]
  })
  export class HomeModule {}
  