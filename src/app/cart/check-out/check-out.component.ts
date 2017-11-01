import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
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
  }];

  address: any;
  order = {
    comment: ""
  }
  constructor(public router: Router, ) { }
  ngOnInit() {
  }
  goGoodsDetail(id) {
    this.router.navigate(['/goods/goods-detail'], { queryParams: { goodsId: id } });
  }
}
