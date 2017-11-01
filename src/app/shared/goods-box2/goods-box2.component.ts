import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-goods-box2',
  templateUrl: './goods-box2.component.html',
  styleUrls: ['./goods-box2.component.scss']
})
export class GoodsBox2Component implements OnInit {

  @Input('goods') goods: any;

  defaultImg = 'assets/image/timg.gif';
  constructor(public router : Router,public route:ActivatedRoute) { }

  discount: boolean = false;
  discounts: number = 0;
  count: any = 1;
  ngOnInit() {
    if (this.goods.costprice > this.goods.price) {
      this.discount = true;
      this.discounts = Math.floor((this.goods.costprice - this.goods.price) * 100 / this.goods.costprice);
    } else {
      this.discount = false;
    }
  }

  goGoodsDetail(id){
    this.router.navigate(['/goods/goods-detail'],{queryParams:{goodsId:id}})
  }

  addToCart(id){
   
  }
}
