import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';
import { SearchComponent } from './search/search.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule,NzFormItemDirective } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
        FooterComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule.forChild(),
        NgZorroAntdModule,
        FormsModule, 
        ReactiveFormsModule
    ],
    providers: [
        NzFormItemDirective
    
    ]
  })
  export class LayoutModule {}
  