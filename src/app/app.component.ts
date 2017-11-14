import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { EventsService } from 'angular4-events';
import { HomeService } from './services';
import { NzModalService } from 'ng-zorro-antd'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private confirmServ: NzModalService, private homeService: HomeService, private eventsService: EventsService, private fb: FormBuilder, public translateService: TranslateService) {
    this.eventsService.subscribe('needLogin').subscribe(res => {
      this.showLogin = true;
    });
    this.translateService.addLangs(["zh", "en"]);
    this.translateService.setDefaultLang('en')
    const browserLang = localStorage.getItem('lang') || this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/zh|en/) ? browserLang : "en");
  }
  title = 'app';
  emailValid: boolean = false;
  isConfirmLoading: boolean = false;
  ngOnInit() {
   
    this.initLoginForm();
    this.initRegisterForm();
  }

  showLogin: boolean = false;
  loginError: boolean = false;
  handleOk = (e) => {

    this.showLogin = false;
  }

  handleCancel = (e) => {
    this.showLogin = false;
    this.initLoginForm();
    this.initRegisterForm();
  }

  loginForm: FormGroup;
  _submitLoginForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }
    if (this.loginForm.invalid) {
      return;
    }

    this.homeService.login(this.loginForm.value);
    this.eventsService.subscribe('closeModel').subscribe(res => {
      this.showLogin = false;
      this.initLoginForm()
    })
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  registerForm: FormGroup;
  emailExisted: boolean = false;
  _submitRegisterForm() {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
    }

    if (this.registerForm.invalid || !this.emailValid) {
      return;
    }
    this.homeService.register(this.loginForm.value).subscribe(res => {
      if (res.json().status == 1) {
        this.showLogin = false;
        this.initRegisterForm();
        this.eventsService.publish('login', res.json().data);
        localStorage.setItem('userInfo', JSON.stringify(res.json().data));
        this.confirmServ.success({
          title: 'Success',
          content: res.json().msg
        });
      }
    });
  }
  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.registerForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
  };

  getFormControl(name) {
    return this.registerForm.controls[name];
  }

  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create((observer) => {
      this.homeService.checkEmail({ email: this.getFormControl('email').value }).map(res => res.json()).subscribe(res => {
        if (res.status == 0) {
          observer.next({ error: true, duplicated: true });
          this.emailValid = false;
        } else {
          observer.next(null);
          this.emailValid = true;
        }
        observer.complete();
      })
    });
  };

  initRegisterForm() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email], [this.userNameAsyncValidator]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, Validators.minLength(6), this.confirmationValidator]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
    });
  }




}
