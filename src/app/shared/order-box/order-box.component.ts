import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-order-box',
  templateUrl: './order-box.component.html',
  styleUrls: ['./order-box.component.scss']
})
export class OrderBoxComponent implements OnInit {

  defaultImg = 'assets/image/timg.gif';
  constructor(private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService) {
    this.getAllOrderList();
  }


  ngOnInit() {

  }
  status: number = 5;
  orderList: any = [];
  pendingPay = [];
  pendingShip = [];
  shiped = [];
  doneList = [];
  cancelList = [];
  isSpinning: boolean = false;
  showList: any = [];
  showItem: any = {};
  isVisible: boolean = false;
  getAllOrderList() {
    this.isSpinning = true;
    this.homeService.all_order_list().map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.orderList = res.data;
        this.showList = this.orderList;
        if (res.data) {
          res.data.forEach(val => {
            if (val.status == 0) {
              this.pendingPay.push(val);
            } else if (val.status == 1) {
              this.pendingShip.push(val);
            } else if (val.status == 2) {
              this.shiped.push(val);
            } else if (val.status == 3) {
              this.doneList.push(val);
            } else {
              this.cancelList.push(val)
            }
          });
        }

      }
    }, err => {
      this.isSpinning = false;
    })
  }

  confirmDetele(index, id) {
    this.confirmServ.confirm({
      title: "Are you sure to delete this one ?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        this.cancelOrder(index, id)
      }
    })
  }

  cancelOrder(index, id) {
    this.isSpinning = true;
    this.homeService.order_cancel({ id: id }).map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.showList.splice(index, 1);
      }

    }, err => {
      this.isSpinning = false;
    })
  }

  changeShow(e) {
    console.log(e)
    switch (e) {
      case "0":
        this.showList = this.pendingPay;
        break;
      case "1":
        this.showList = this.pendingShip;
        break;
      case "2":
        this.showList = this.shiped;
        break;
      case "3":
        this.showList = this.doneList;
        break;
      case "5":
        this.showList = this.orderList;
        break;

    }
  }

  payNow(id) {
    this.isSpinning = true;
    this.homeService.pay({ order_id: id }).map(res => res.json()).subscribe(res => {

      if (res.status == 1) {
        location.href = res.data;
      }
    }, err => {
      this.isSpinning = false;
    })
  }

  showDetail(item) {
    this.showItem = item;
    this.isVisible = true;

  }
  handleCancel = (e) => {
    this.isVisible = false;
    this.showItem = {};
  }

  
}
