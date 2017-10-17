import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutes as routes } from './index.router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
      // components
      HomeComponent,
      
    ],
    exports: [
    ],
    imports: [
      RouterModule.forChild(routes),
      LazyLoadImageModule,
      BrowserModule,
      TranslateModule
    ],
    providers: [
        
    
    ]
  })
  export class HomeModule {}
  