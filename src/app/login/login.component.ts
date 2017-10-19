import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup ,FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  registerForm: FormGroup;
  
  loginForm: FormGroup;
  
    register() {
      for (const i in this.registerForm.controls) {
        this.registerForm.controls[ i ].markAsDirty();
      }
    }
  
    constructor(private fb: FormBuilder) {
    }
  
    updateConfirmValidator() {
      /** wait for refresh value */
      setTimeout(_ => {
        this.registerForm.controls[ 'checkPassword' ].updateValueAndValidity();
      });
    }
  
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.registerForm.controls[ 'password' ].value) {
        return { confirm: true, error: true };
      }
    };
  
    getCaptcha(e: MouseEvent) {
      e.preventDefault();
    }
  
    ngOnInit() {
      this.registerForm = this.fb.group({
        email            : [ null, [ Validators.email,Validators.required ] ],
        password         : [ null, [ Validators.required ] ],
        checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
        firstname       : [ null, [ Validators.required ] ],
        lastname       : [ null, [ Validators.required ] ],
        agree            : [ false ]
      });

      this.loginForm = this.fb.group({
        userName: [ null, [ Validators.required ,Validators.email] ],
        password: [ null, [ Validators.required ] ],
        remember: [ true ]
      });
    }
  
    getFormControl(name) {
      return this.registerForm.controls[ name ];
    }
  
    getLoginControl(name){
      return this.loginForm.controls[ name ];
    }
    

    login() {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[ i ].markAsDirty();
      }
    }
  
}
