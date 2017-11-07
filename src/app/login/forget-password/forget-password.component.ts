import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { EventsService} from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private confirmServ: NzModalService,public events:EventsService,public homeService:HomeService,private fb: FormBuilder) { }

  email;
  validateForm: FormGroup;
  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [ null, [ Validators.required,Validators.email ] ],
      
    });
  }

  sendEmailReset(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }

    if(this.validateForm.invalid){
      return;
    }
    let data = {
      email:this.email
    }
    this.homeService.sendResetPsdEmail(data).map(res => res.json()).subscribe(res =>{
      if(res.status == 1){
        this.confirmServ.success({
          title:res.msg,
          okText:"Confirm"
        })
      }
    })
  }
}
