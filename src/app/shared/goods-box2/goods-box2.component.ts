import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { HomeService} from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-goods-box2',
  templateUrl: './goods-box2.component.html',
  styleUrls: ['./goods-box2.component.scss']
})
export class GoodsBox2Component implements OnInit {

  @Input('goods') goods: any;

  defaultImg = 'assets/image/timg.gif';
  constructor(private homeService: HomeService,private events:EventsService,private confirmServ: NzModalService,public router : Router,public route:ActivatedRoute) { }

  discount: boolean = false;
  discounts: number = 0;
  count: any = 1;
  isSpinning:boolean =false;
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

  addToCart(){
    this.isSpinning = true;
    let data  = {
      goods_id:this.goods.id,
      info_id:this.goods.info_id,
      goods_sum:this.count
    }
    this.homeService.add_to_cart(data).subscribe(res =>{
      this.isSpinning = false;
      this.events.publish('cart');
      if( res.json().status = 1){
        this.confirmServ.success({
          title: 'Success',
          content: res.json().msg,
          okText:"Confirm"
        });
      }
    },err =>{
      this.isSpinning = false;
    })
  }
}
