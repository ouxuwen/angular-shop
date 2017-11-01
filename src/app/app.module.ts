import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsModule } from 'angular4-events';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LayoutModule } from './layout/index';
import { SharedModule } from './shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeService,HttpService,AuthLogin,AuthLogout } from './services';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    RouterModule.forRoot(routes),
    NgZorroAntdModule.forRoot(),
    SharedModule,
    BrowserModule,
    LazyLoadImageModule,
    LayoutModule,
    EventsModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }
    )
  ],
  providers: [HomeService,HttpService,AuthLogin,AuthLogout ],
  bootstrap: [AppComponent]
})
export class AppModule { }
