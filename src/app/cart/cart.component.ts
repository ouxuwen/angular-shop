import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { HomeService } from '../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartNum:number = 1;
  defaultImg = '/assets/image/loading.gif'
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  data = [] ;
  cartCount: number = 0;
  cartTotal = 0;
  cartList: any=[];
  constructor(private confirmServ: NzModalService,public eventsService: EventsService, public homeService: HomeService,public router : Router,public route:ActivatedRoute) {
    this.getCart() ;
  }
  _displayDataChange($event) {
    this._displayData = $event;
    this._refreshStatus();
  };

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  };

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => {
        data.checked = true;
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  };

  

  ngOnInit() {
  }

  goGoodsDetail(id){
    this.router.navigate(['/goods/goods-detail'],{queryParams:{goodsId:id}});
  }

  goCheckOut(id){
    this.router.navigate(['/cart/check-out'],{queryParams:{check:id}});
  }

  getCart() {
    this.homeService.cart_list().map(res => res.json()).subscribe(res => {
      if (res.status == 1) {
        this.cartList = res.data.list;
        this.cartCount = res.data.list.length;
        this.cartTotal = res.data.total_price;
      }
    })
  }
  
  
}
