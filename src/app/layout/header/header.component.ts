import { Component, OnInit } from '@angular/core';
import {TranslateService } from '@ngx-translate/core'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public translateService:TranslateService) { }

  myDj:boolean = false;
  loginTouch:boolean = false;
  
  ngOnInit() {
  }

  changeLang(en){
    localStorage.setItem('lang',en);
    this.translateService.use(en);
  }

  test(){
    this.myDj = !this.myDj;
    console.log(this.myDj)
  }
}
