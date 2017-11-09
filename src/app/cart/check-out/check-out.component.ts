import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  data = {
    "list":[]
  };

  address: any;
  order = {
    comment: ""
  }
  constructor( private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService,public router: Router, ) { 
    this.getAddress();
    this.orderConfirm();
  }
  isVisible:boolean = false;
  addressId:any;
  addressList : any =[];
  isSpinning:boolean = false;
  addAddress() {
    this.isVisible = true;
    this.addressId = null;


  }

  ngOnInit() {

  }
  goGoodsDetail(id) {
    this.router.navigate(['/goods/goods-detail'], { queryParams: { goodsId: id } });
  }

  getAddress(){
    this.homeService.list_address().map(res => res.json()).subscribe(res =>{
      if(res.status == 1){
        this.addressList = res.data;
      }
    })
  }

  orderConfirm(){
    this.isSpinning = true;
    this.homeService.order_confirm().map(res => res.json()).subscribe(res =>{
      this.isSpinning = false;
      if(res.status == 1){
        this.data = res.data;
        
      }
    },err =>{
      this.isSpinning = false;
    })
  }
}
