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
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {

  constructor(private fb: FormBuilder, private homeService: HomeService, private confirmServ: NzModalService) { }

  validateForm: FormGroup;
  isLoading: boolean = false;
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      order: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      remember: [true],
    });
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.isLoading = true;
    setTimeout(()=> {
      this.isLoading = false;
      this.confirmServ.success({
        title:"Success !",
        content:"If there are any news for your order , we will send you a email~",
        okText:"Confirm"
      })
    }, 2000);
  }
}
