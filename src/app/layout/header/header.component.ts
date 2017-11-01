import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {EventsService} from 'angular4-events';
import {HomeService } from '../../services'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private homeService :HomeService,private eventsService : EventsService,private fb: FormBuilder, public router: Router, public translateService: TranslateService) {
    this.checkLogin();
    this.eventsService.subscribe('login').subscribe(res =>{
      this.checkLogin();
    })

  }

  myDj: boolean = false;
  loginTouch: boolean = false;
  isLogin: boolean = false;
  loginForm: FormGroup;
  userInfo: any;
  ngOnInit() {
   this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
  changeLang(en) {
    localStorage.setItem('lang', en);
    this.translateService.use(en);
  }

  test() {
    this.myDj = !this.myDj;
    console.log(this.myDj)
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  submitForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }
    if (this.loginForm.invalid) {
      return;
    }

    this.homeService.login(this.loginForm.value)
  }
  getFormControl(name) {
    return this.loginForm.controls[name];
  }

  checkLogin() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (this.userInfo) {
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }
  

  logOut(){
    this.homeService.logOut();
  }
}
