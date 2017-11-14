import { Component, OnInit,Input,Output,ViewChild,ElementRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-facebook-box',
  templateUrl: './facebook-box.component.html',
  styleUrls: ['./facebook-box.component.scss']
})
export class FaceBoxComponent implements OnInit {
  

  constructor( private confirmServ: NzModalService) { }

  ngOnInit() {
   
  }
  isLoading:boolean = false;
  _submitForm() {
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    // }
    // if (this.validateForm.invalid) {
    //   return;
    // }
    this.isLoading = true;
    setTimeout(()=> {
      this.isLoading = false;
      this.confirmServ.success({
        title:"Success !",
        content:"If there are any news for our Goods , we will send you a email ^-^",
        okText:"Confirm"
      })
    }, 2000);
  }
  
}
