import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit {
  allCateList: any;
  lastLvl: any;
  secondLvl: any;
  firstLvl: any;
  goods = [{
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

  parts = ["LCD", "LCD ASSY", "Battery", "Frame", "Button", "Housing", "Glass", "Speaker", "Camera", "Other", "Earpiece", "Charger", "Cables", "Cases", "Screen", "Adhesives"];
  morePart: boolean = false;



  constructor(public router: Router, public activeRouter: ActivatedRoute) {
    this.activeRouter.queryParams.subscribe(params => {
      let id = JSON.parse(params['cate']);
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

    })
  }

  ngOnInit() {
  }
  goAllModel(id) {
    this.router.navigate(['/goods/all-model'], { queryParams: { cate: id } })
  }
  goModel(id) {
    this.router.navigate(['/goods/model'], { queryParams: { cate: id } })
  }


  upSort(property) {
    return function (obj1, obj2) {
      let value1 = obj1[property];
      let value2 = obj2[property];
      return value1 - value2;     // 升序
    }
  }
  downSort(property) {
    return function (obj1, obj2) {
      let value1 = obj1[property];
      let value2 = obj2[property];
      return value2 - value1;     // 降序
    }
  }
}
