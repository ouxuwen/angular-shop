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
  shipVisible: boolean = false;
  logistics:any;
  logisticsError:boolean = false;
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
  showShip(item) {
    this.showItem = item;
    this.shipVisible = true;
    this.getShip();
  }
  handleShip = (e) => {
    this.shipVisible = false;
    this.showItem = {};
    
  }

  getShip() {
    let data = {
      id: "XDB2gzsjbsss34owa07aNo0I_1584190734",
      com: "",
      nu: this.showItem.logistics_num
    }
    this.CODE.forEach(val => {
      if (val.key == this.showItem.logistics_company) {
        data.com = val.value;
      } else {
        data.com = 'auto'
      }
    })
    // let data = {
    //   id: "XDB2gzsjbsss34owa07aNo0I_1584190734",
    //   com: "auto",
    //   nu: '461953546762'
    // }
    this.homeService.getLogistics(data).map(res =>res.json()).subscribe(res => {
      //console.log(res);
      this.logistics = res;
    },err =>{
      // console.log(err);
      if(err){
        this.logisticsError = true;
      }else{
        this.logisticsError = false;
      }
    })
  }

  signGoods(id){
    this.shipVisible = false;
  }

  CODE = [
    { "key": "中通快递", "value": "zhongtong" },
    { "key": "中通快运", "value": "zto56" },
    { "key": "圆通", "value": "yuantong" },
    { "key": "申通", "value": "shentong" },
    { "key": "百世汇通", "value": "huitong" },
    { "key": "韵达", "value": "yunda" },
    { "key": "顺丰", "value": "shunfeng" },
    { "key": "宅急送", "value": "zjs" },
    { "key": "德邦", "value": "debang" },
    { "key": "全峰", "value": "quanfeng" },
    { "key": "中铁快运", "value": "zhongtie" },
    { "key": "天天", "value": "tiantian" },
    { "key": "EMS", "value": "ems" },
    { "key": "香港邮政", "value": "hkpost" },
    { "key": "邮政小包", "value": "chinapost" },
    { "key": "优速", "value": "yousu" },
    { "key": "如风达", "value": "rufengda" },
    { "key": "京东快递", "value": "jingdong" },
    { "key": "飞鹰物流", "value": "feiying" },
    { "key": "佳吉快运", "value": "jiaji" },
    { "key": "国通快递", "value": "guotong" },
    { "key": "长江国际速递", "value": "changjiang" },
    { "key": "增益速递", "value": "zengyisudi" },
    { "key": "天地华宇", "value": "tiandihuayu" },
    { "key": "速尔快递", "value": "suer" },
    { "key": "龙邦速递", "value": "lbex" },
    { "key": "快捷快递", "value": "kjkd" },
    { "key": "跨越速运", "value": "kuayue" },
    { "key": "日日顺", "value": "rrs" },
    { "key": "快客快递", "value": "gotoquick" },
    { "key": "联昊通速递", "value": "lhtex" },
    { "key": "信丰物流", "value": "xinfengwuliu" },
    { "key": "加运美速递", "value": "jym56" },
    { "key": "安能物流", "value": "ane56" },
    { "key": "DHL", "value": "dhl" },
    { "key": "TNT", "value": "tnt" },
    { "key": "UPS", "value": "ups" },
    { "key": "USPS", "value": "usps" },
    { "key": "FedEx", "value": "fedex" },
    { "key": "比利时快递", "value": "belgium" },
    { "key": "其他", "value": "auto" },
  ]


}

