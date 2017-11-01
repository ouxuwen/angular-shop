import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
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
  data = [{
    "id": 46,
    "goods_name": "For Apple iPhone X Tempered Glass Screen Protector (5D) Replacement (Without Package) - Black - Grade R\t",
    "cate_id": 62,
    "price": "1.00",
    "costprice": "1.00",
    "cover": 572,
    "url": "http://oyiph6mjm.bkt.clouddn.com/55e71d9fe966b03b95070293d33bcf93.png"
  },
  {
    "id": 46,
    "goods_name": "For Apple iPhone X Tempered Glass Screen Protector (5D) Replacement (Without Package) - Black - Grade R\t",
    "cate_id": 62,
    "price": "1.00",
    "costprice": "1.00",
    "cover": 572,
    "url": "http://oyiph6mjm.bkt.clouddn.com/55e71d9fe966b03b95070293d33bcf93.png"
  }, {
    "id": 46,
    "goods_name": "For Apple iPhone X Tempered Glass Screen Protector (5D) Replacement (Without Package) - Black - Grade R\t",
    "cate_id": 62,
    "price": "1.00",
    "costprice": "1.00",
    "cover": 572,
    "url": "http://oyiph6mjm.bkt.clouddn.com/55e71d9fe966b03b95070293d33bcf93.png"
  }, {
    "id": 46,
    "goods_name": "For Apple iPhone X Tempered Glass Screen Protector (5D) Replacement (Without Package) - Black - Grade R\t",
    "cate_id": 62,
    "price": "1.00",
    "costprice": "1.00",
    "cover": 572,
    "url": "http://oyiph6mjm.bkt.clouddn.com/55e71d9fe966b03b95070293d33bcf93.png"
  }, {
    "id": 46,
    "goods_name": "For Apple iPhone X Tempered Glass Screen Protector (5D) Replacement (Without Package) - Black - Grade R\t",
    "cate_id": 62,
    "price": "1.00",
    "costprice": "1.00",
    "cover": 572,
    "url": "http://oyiph6mjm.bkt.clouddn.com/55e71d9fe966b03b95070293d33bcf93.png"
  }] ;
  constructor(public router : Router,public route:ActivatedRoute) {
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

  
}
