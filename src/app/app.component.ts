import { Component } from '@angular/core';
import {TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translateService:TranslateService){

  }
  title = 'app';

  ngOnInit(){
    this.translateService.addLangs(["zh","en"]);
    this.translateService.setDefaultLang('en')
    const browserLang = localStorage.getItem('lang') ||  this.translateService.getBrowserLang();
    console.log(browserLang);
    this.translateService.use(browserLang.match(/zh|en/)?browserLang:"en");
  }
}
