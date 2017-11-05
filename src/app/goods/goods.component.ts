import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../services';
import { NzModalService } from 'ng-zorro-antd';
import { EventsService } from 'angular4-events';
@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {
  allCateList: any;
  lastLvl: any;
  secondLvl: any;
  firstLvl: any;
  constructor(private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService, public router: Router, public activeRouter: ActivatedRoute) {
    this.activeRouter.queryParams.subscribe(res => {
      this.goodsId = res['goodsId'];

      this.getGoodsInfo();

    })

  }
  isSpinning: boolean = false;
  goodsId: any;
  goodsInfo: any;
  ngOnInit() {
  }
  zoomedImageSrc = "";
  defaultImg = 'assets/image/loading.gif';
  showGoods: any;
  imgIndex = 0;
  goodsIndex = 0;
  goodsCount: number = 1;
  goodsTotalPrice: number = 0.00;

  
  getGoodsInfo() {
    this.isSpinning = true;
    this.homeService.goods_info({ info_id: this.goodsId }).map(res => res.json()).subscribe(res => {
      this.goodsInfo = res.data;
      this.zoomedImageSrc = this.goodsInfo.gallery[0].url;
      this.showGoods = this.goodsInfo.goods_list[this.goodsIndex];

      this.isSpinning = false;

      let id = this.goodsInfo.goods_info.cate_id;
      this.allCateList = JSON.parse(localStorage.getItem('allCateList'));
      if (this.allCateList) {
        this.allCateList.forEach(element => {
          element['children'].forEach(val => {
            val['children'].forEach(item => {
              if (id == item.id) {
                this.lastLvl = item;
                this.secondLvl = val;
                this.firstLvl = element;
              }
            })
          })
        });
      }



    }, err => {
      this.isSpinning = false;
    })
  }

  /**
   * change the showing imgae
   */
  changeImgIndex(index) {
    this.imgIndex = index;
    this.zoomedImageSrc = this.goodsInfo.gallery[index].url;
  }
  load() {
    console.log('loading');

  }
  mouseIn: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
  mouseMove(e) {
    let wrap = document.getElementById('wrap');
    this.mouseX = e.clientX - 50 - wrap.getBoundingClientRect()['x'];
    this.mouseY = e.clientY - 50 - wrap.getBoundingClientRect()['y'];
    if (this.mouseX < 0) {
      this.mouseX = 0;
    }
    if (this.mouseX > 300) {
      this.mouseX = 300;
    }
    if (this.mouseY < 0) {
      this.mouseY = 0;
    }
    if (this.mouseY > 300) {
      this.mouseY = 300;
    }
  }

  changeGoodsIndex(i) {
    this.goodsIndex = i;
    this.showGoods = this.goodsInfo.goods_list[this.goodsIndex];
  }

  addWishList(id) {

  }
  dj: number = 0;
  moveLeft(i) {
    let ul = document.getElementById('imgList');
    let num = this.goodsInfo.gallery.length;
    this.dj += i;
    if (num > 6 && this.dj >= (6 - num) && this.dj <= 0) {
      ul.style.marginLeft = (this.dj) * 62 + "px";
    }
  }
  goAllModel(id) {
    this.router.navigate(['/goods/all-model'], { queryParams: { cate: id } })
  }
  goModel(id) {
    this.router.navigate(['/goods/model'], { queryParams: { cate: id } })
  }
  goGoodsList(id) {
    this.router.navigate(['/goods/goods-list'], { queryParams: { cate: id } })
  }
  addToCart() {
    this.isSpinning = true;
    let data = {
      goods_id: this.showGoods.id,
      info_id: this.showGoods.info_id,
      goods_sum: this.goodsCount
    }
    this.homeService.add_to_cart(data).subscribe(res => {
      this.isSpinning = false;
      this.events.publish('cart');
      if (res.json().status = 1) {
        this.confirmServ.success({
          title: 'Success',
          content: res.json().msg,
          okText: "Confirm"
        });
      }
    }, err => {
      this.isSpinning = false;
    })
  }
  addToWishList() {
    this.isSpinning = true;
    let data = {
      goods_id: this.showGoods.id,
      info_id: this.showGoods.info_id,
    }
    this.homeService.add_goods_collect(data).subscribe(res => {
      this.isSpinning = false;
      if (res.json().status = 1) {
        this.confirmServ.success({
          title: 'Success',
          content: res.json().msg
        });
      }
    }, err => {
      this.isSpinning = false;
    })
  }


}
