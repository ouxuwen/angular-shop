import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartNum: number = 1;
  defaultImg = '/assets/image/loading.gif'
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  data = [];
  cartCount: number = 0;
  cartTotal = 0;
  cartList: any = [];
  isSpinning: boolean = false;
  constructor(private confirmServ: NzModalService, public eventsService: EventsService, public homeService: HomeService, public router: Router, public route: ActivatedRoute) {
    this.getCart();

  }
  _displayDataChange($event) {
    this._displayData = $event;
    this._refreshStatus();
  };

  _refreshStatus(event?) {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this.cartTotal = 0;
    this._displayData.forEach(value => {

      if (value.checked) {
        this.cartTotal += value.price * value.goods_sum;
        this.update_cart_status(value,1);
      }else{
        this.update_cart_status(value,2);
      }
    })
    

  };

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => {
        data.checked = true;
        this.update_allcart_status(1);
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
        this.update_allcart_status(2)
      });
    }
    this._refreshStatus();
  };



  ngOnInit() {
  }

  goGoodsDetail(id) {
    this.router.navigate(['/goods/goods-detail'], { queryParams: { goodsId: id } });
  }

  goCheckOut() {
    let arr = []
    this._displayData.forEach(value => {
      
      if (value.checked) {
              arr.push(value);
             
      }
    })
    if(arr.length ==0 ){
      this.confirmServ.error({
        title:"No goods select to order !",
        okText:"Confirm"
      })
    }else{
      this.router.navigate(['/cart/check-out']);
    }
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

  confirmDetele(id) {
    this.confirmServ.confirm({
      title: "Are you sure to delete this one ?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        this.deleteCartItem(id)
      }
    })
  }

  deleteCartItem(id) {
    this.isSpinning = true;
    let data = {
      id: id
    }
    this.homeService.delete_to_cart(data).map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.getCart();
        this.confirmServ.success({
          title: "Success",
          content: " Delete Success !",
          okText: "Confirm"
        })
      }
    }, err => {
      this.isSpinning = false;
    })
  }

  updateCart(id) {

  }

  addToCart(item) {
    let data = {
      goods_id: item.goods_id,
      info_id: item.info_id
    }
    item.goods_sum++;
    
    this._refreshStatus();
    this.homeService.add_to_cart(data).map(res => res.json()).subscribe(res => {



    })
  }

  downToCart(item) {
    let data = {
      goods_id: item.goods_id,
      info_id: item.info_id
    }
    item.goods_sum--;
    
    this._refreshStatus();
    if (item.goods_sum <= 1) {
      item.goods_sum=1;
      this.confirmDetele(item.id)
    } else {
      this.homeService.cutdown_to_cart(data).map(res => res.json()).subscribe(res => {



      })
    }

  }
  //更改购物车清单状态，1：选中结算，2：暂不结算
  update_cart_status(item,status) {
    let data = {
      goods_id:item.goods_id,
      status:status
    }
    this.homeService.update_cart_status(data).map(res => res.json()).subscribe(res =>{

    })
  }

  update_allcart_status(status) { 
    let data = {
      status:status
    }
    this.homeService.update_allcart_status(data).map(res => res.json()).subscribe(res =>{

    })
  }

 
}
