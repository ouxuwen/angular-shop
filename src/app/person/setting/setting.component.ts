import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { NzModalService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(private fb: FormBuilder, private homeService: HomeService, private confirmServ: NzModalService) { }

  ngOnInit() {
    if(localStorage.getItem("userInfo")){
      this.data = JSON.parse(localStorage.getItem("userInfo"));
    }
    this.initPassword();
    this.initUser(this.data);
  }

  userForm: FormGroup;
  passForm: FormGroup;
  userActive:boolean = true;
  isLoading:boolean= false;
  data={
    email:null,
    firstname:null,
    lastname:null
  }
  saveUserForm() {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
    }
    if (this.userForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.homeService.update_username(this.userForm.value).map(res => res.json()).subscribe(res =>{
      this.isLoading = false;
      if(res.status == 1){
        this.confirmServ.success({
          title:" Update Success !",
          content:"Please login again",
          okText:"Confirm",
          onOk:()=>{
            this.homeService.logOut();
          }
        })
      }
    })
  }
  getUserControl(name) {
    return this.userForm.controls[name];
  }
  initUser(data) {
    this.userForm = this.fb.group({
      email: [data.email, [Validators.email, Validators.required]],
      firstname: [data.firstname, [Validators.required]],
      lastname: [data.lastname, [Validators.required]],
    });
  }

  initPassword() {
    this.passForm = this.fb.group({

      old_password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      new_password: [null, [Validators.required]],
    });
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.passForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.passForm.controls['new_password'].value) {
      return { confirm: true, error: true };
    }
  };

  getPassControl(name) {
    return this.passForm.controls[name];
  }

  savePassForm() {
    for (const i in this.passForm.controls) {
      this.passForm.controls[i].markAsDirty();
    }
    if (this.passForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.homeService.updatePassword(this.passForm.value).map(res => res.json()).subscribe(res =>{
        this.isLoading =false;
      if(res.status == 1){
        this.confirmServ.success({
          title:" Update Success !",
          content:"Please login again",
          okText:"Confirm",
          onOk:()=>{
            this.homeService.logOut();
          }
        })
      }
    },err =>{
      this.isLoading =false;
    })
  }
}
