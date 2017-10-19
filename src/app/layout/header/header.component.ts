import { Component, OnInit } from '@angular/core';
import {TranslateService } from '@ngx-translate/core'
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public translateService:TranslateService) { }

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

  login(){
    this.router.navigateByUrl('/login');
  }
}
