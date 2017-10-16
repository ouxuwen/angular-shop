import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.router' 
import { CouponApi } from './config'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsModule } from 'angular4-events';

import { HomeModule } from './home/index';
import { LayoutModule } from './layout/index';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader( http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HomeModule,
    LayoutModule,
    EventsModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
      }
    }
    )
  ],
  providers: [CouponApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
