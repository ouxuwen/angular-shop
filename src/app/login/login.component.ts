import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { EventsService} from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  registerForm: FormGroup;

  loginForm: FormGroup;
  emailValid:boolean = false;
  constructor(public router:Router,private confirmServ: NzModalService,public events:EventsService,public homeService:HomeService,private fb: FormBuilder) {
    
  }
  register() {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
    }
    if(this.registerForm.invalid){
      return;
    }
    if(!this.emailValid){
      return;
    }

    this.homeService.register(this.registerForm.value).map(res => res.json()).subscribe(res => {
      if(res.status == 1){
        this.events.publish('login',res.data);
        localStorage.setItem('userInfo',JSON.stringify(res.data));
        this.confirmServ.success({
          title: 'Success',
          content: res.msg
        });
        this.router.navigate(['/home']);
      }else{
        
      }
    })
    
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

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required], [this.userNameAsyncValidator]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, Validators.minLength(6), this.confirmationValidator]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      agree: [false]
    });

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  getFormControl(name) {
    return this.registerForm.controls[name];
  }

  getLoginControl(name) {
    return this.loginForm.controls[name];
  }

  userNameAsyncValidator = (control: FormControl): any => {
 
    return Observable.create( (observer)=> {
      this.homeService.checkEmail({email:this.getFormControl('email').value}).map(res => res.json()).subscribe(res=>{
        if(res.status == 0){
          observer.next({ error: true, duplicated: true });
          this.emailValid = false;
        }else{
          observer.next(null);
          this.emailValid = true;
        }
        observer.complete();
      })
     
    });
  };

  login() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }
    if(this.loginForm.invalid){
      return;
    }

    this.homeService.login(this.loginForm.value);

  }

}
