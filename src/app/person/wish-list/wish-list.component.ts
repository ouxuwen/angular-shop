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
    // this.getWishList()
  }
  isSpinning: boolean = false;
  ngOnInit() {
  }
  data = [
    {
      "id": 12,
      "mid": 23,
      "goods_id": 80,
      "info_id": 76,
      "create_time": 1505229737,
      "update_time": 0,
      "goods_name": "艾瑞斯1.67非球高散绿膜",
      "url": "http://ov72bmeyv.bkt.clouddn.com/b08f6ab852d99fa6961bc94c1aafefca.png",
      "price": "27.00",
      goodsNum: 1
    },
    {
      "id": 13,
      "mid": 23,
      "goods_id": 94,
      "info_id": 90,
      "create_time": 1505229873,
      "update_time": 0,
      "goods_name": "唯视  精E1.56绿膜",
      "url": "http://ov72bmeyv.bkt.clouddn.com/7be7292c407e8a5d06703c653eda959f.png",
      "price": "3.75",
      goodsNum: 1
    },
    {
      "id": 14,
      "mid": 23,
      "goods_id": 59,
      "info_id": 55,
      "create_time": 1505231115,
      "update_time": 0,
      "goods_name": "蔡司镜片1.56非球A系列莲花膜树脂近视眼镜片",
      "url": "http://ov72bmeyv.bkt.clouddn.com/9e2615d89e8c05236298b7c810ddb211.png",
      "price": "100.00",
      goodsNum: 1
    }
  ]
  getWishList() {
    this.isSpinning = true;
    this.homeService.list_goods_collect().map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.data = res.data;

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

}
