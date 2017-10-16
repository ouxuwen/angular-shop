import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutes as routes } from './index.router';
@NgModule({
    declarations: [
      // components
      HomeComponent,
      
    ],
    exports: [
    ],
    imports: [
      RouterModule.forChild(routes),
     
    ],
    providers: [
        
    
    ]
  })
  export class HomeModule {}
  