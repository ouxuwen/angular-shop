import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(private router: Router, private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService) {
     this.getWishList()
  }
  isSpinning: boolean = false;
  ngOnInit() {
  }
  data = [
    
  ]
  getWishList() {
    this.isSpinning = true;
    this.homeService.list_goods_collect().map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.data = res.data.data;
        this.data.forEach(value=>{
          value['goodsNum']=1;
        })
      }
    }, err => {
      this.isSpinning = false;
    })
  }

  deleteWishItem(id) {
    this.isSpinning = true;
    this.homeService.delete_goods_collect({ id: id }).map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {

        this.confirmServ.success({
          title: "Delete successfully !",
          okText: "Confirm"
        })

      }
    }, err => {
      this.isSpinning = false;
    })
  }

  goGoodsDetail(id) {
    this.router.navigate(['/goods/goods-detail'], { queryParams: { goodsId: id } })
  }

  addToCart(item){
    this.isSpinning = true;
    let data  = {
      goods_id:item.goods_id,
      info_id:item.info_id,
      goods_sum:item.goodsNum
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

  update(){
    this.getWishList();
  }

}
