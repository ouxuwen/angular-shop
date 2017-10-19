import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { HomeRoutes as routes } from './index.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {　FormsModule,ReactiveFormsModule } from '@angular/forms'
@NgModule({
    declarations: [
      // components
      LoginComponent,
      
    ],
    exports: [
    ],
    imports: [
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
  export class LoginModule {}
  