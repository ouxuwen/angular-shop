import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
      // components
        HeaderComponent,
        SearchComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        SearchComponent,
        FooterComponent
    ],
    imports: [
        RouterModule,
        TranslateModule.forChild(),
        
    ],
    providers: [
        
    
    ]
  })
  export class LayoutModule {}
  