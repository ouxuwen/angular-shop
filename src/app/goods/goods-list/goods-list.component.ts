import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services';
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
  showGoodsList: Array<any> = [];
  goods: any;
  nzSpinning: boolean = false;
  parts = ["LCD", "LCD ASSY", "Battery", "Frame", "Button", "Housing", "Glass", "Speaker", "Camera", "Other", "Earpiece", "Charger", "Cables", "Cases", "Screen", "Adhesives"];
  morePart: boolean = false;
  partsId = null;
  _current = 1;
  showNum :number = 20;
  constructor(public homeService: HomeService, public router: Router, public activeRouter: ActivatedRoute) {
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
      this.getCateList(id);

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


  selectPart(id, item?) {
   
    if (this.partsId) {
      this.partsId = null;
      this.showGoodsList = this.goods;
    } else {
      this.partsId = id;
      this.showGoodsList = [];
      this.goods.forEach(value => {
        if (value.goods_name.toLowerCase().indexOf(item.toLowerCase()) != -1) {
          this.showGoodsList.push(value);
        }
      })
    }
    this.getShowList();
  }

  changeShowList(e) {
    console.log(e);
    this.getShowList();
  }

  changePage(){
    this.getShowList();
  }
  getCateList(id) {
    this.nzSpinning = true;
    this.homeService.getCateGoodsList({ cate_id: id }).subscribe(res => {
      this.nzSpinning = false;
      this.goods = res.json().data;
      this.showGoodsList = this.goods;
      this.getShowList();
    }, err => {
      this.nzSpinning = false;
    })
  }

  finallyList:any=[];
  getShowList(){
    
    let arr = JSON.parse(JSON.stringify(this.showGoodsList));
    this.finallyList= arr.slice((this._current-1)*this.showNum,this._current*this.showNum);

  }
}
