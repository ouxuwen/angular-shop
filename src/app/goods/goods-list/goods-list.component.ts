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
  parts = [{ "name": "LCD" }, { "name": "LCD ASSY" }, { "name": "Battery" }, { "name": "Frame" }, { "name": "Button" }, { "name": "Housing" }, { "name": "Glass" }, { "name": "Speaker" }, { "name": "Camera" }, { "name": "Other" }, { "name": "Earpiece" }, { "name": "Charger" }, { "name": "Cables" }, { "name": "Cases" }, { "name": "Screen" }, { "name": "Adhesives" }];
  morePart: boolean = false;
  moreCate: boolean = false;
  partsId = null;
  cateId = null;
  goodsType = null;
  goodsCate = null;
  total: number = 0;
  paramSearch = {
    keywords: null,
    cate_id: null,
    is_new: null,
    is_rec: null,
    is_hot: null,
    is_exc: null,
    current: 1,
    page_size: 20
  }
  categoryList: any = {};
  objectKeys = Object.keys;
  constructor(public homeService: HomeService, public router: Router, public activeRouter: ActivatedRoute) {
    this.activeRouter.queryParams.subscribe(params => {
      if (params['cate']) {
        let id = JSON.parse(params['cate']);
        this.paramSearch.cate_id = id;
       this.goodsCate = id;
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
      } else {
        this.paramSearch.cate_id = null;
        this.goodsCate = null;
      }

      if (params['keywords']) {

        this.paramSearch.keywords = params['keywords'];

      } else {
        this.paramSearch.keywords = null;
      }

      if (params['type']) {
        this.paramSearch[params['type']] = 1;
        this.goodsType = params['type'];
      } else {
        this.paramSearch.is_new = null;
        this.paramSearch.is_rec = null;
        this.paramSearch.is_hot = null;
        this.paramSearch.is_exc = null;
        this.goodsType = null;
      }



      this.getCateList();

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

  up() {
    this.showGoodsList.sort(this.upSort('price'));
  }

  down() {
    this.showGoodsList.sort(this.downSort('price'));
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
    this.getCateList();
  }

  selectCate(id) {
    if (this.paramSearch.cate_id) {
      this.paramSearch.cate_id = null;
      this.getCateList();
    } else {
      this.paramSearch.cate_id = id;
      this.getCateList();
    }
  }

  changeShowList(e) {
    this.paramSearch.page_size = Number(e);
    this.getCateList();
  }

  changePage(e) {
    this.paramSearch.current = e;
    this.getCateList();
  }
  getCateList() {
    this.nzSpinning = true;
    this.homeService.getCateGoodsList(this.paramSearch).subscribe(res => {
      this.nzSpinning = false;
      this.goods = res.json().data.list.data;
      this.showGoodsList = this.goods;
      this.total = res.json().data.total;
      this.paramSearch.current = res.json().data.list.current_page;
      this.paramSearch.page_size = res.json().data.list.per_page;
      this.categoryList = {};
      this.goods.forEach(value => {
        if (this.categoryList[value.cate_name]) {
          this.categoryList[value.cate_name]['num'] += 1;
        } else {
          this.categoryList[value.cate_name] = { num: 1, id: value.cate_id };
        }
      })

    }, err => {
      this.nzSpinning = false;
    })
  }



}
