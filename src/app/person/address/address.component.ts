import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService) {
    this.getAddressList();
  }

  isVisible: boolean = false;
  addressId: number;
  isSpinning: boolean = false;
  addressList: any = [];
  ngOnInit() {
  }

  addAddress() {
    this.isVisible = true;
    this.addressId = null;


  }

  editAddress(id) {
    this.isVisible = true;
    this.addressId = id;

  }

  setDefault(id){
    this.homeService.set_default_address({id:id}).map(res => res.json()).subscribe(res =>{
      if(res.status == 1){
        this.confirmServ.success({
          title:"Success",
          okText:"Confirm"
        })
        this.getAddressList();
      }
    
    })
  }
  
  removeAddress(id) {
    this.isSpinning = true;
    this.homeService.delete_address({ id: id }).map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if(res.status == 1){
        this.confirmServ.success({
          title:"Delete successfully !",
          okText:"Confirm"
        })
        this.getAddressList();
      }
    }, err => {
      this.isSpinning = false;
    })
  }
  getAddressList() {
    this.isSpinning = true;
    this.homeService.list_address().map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.addressList = res.data;
      }
    }, err => {
      this.isSpinning = false;
    })
  }

}
