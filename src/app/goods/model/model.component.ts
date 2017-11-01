import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  allCateList: any;
  lastLvl: any;
  secondLvl: any;
  firstLvl: any;
  defaultImage = 'assets/image/lazyload.gif';
  constructor(public router:Router, public activatedRoute: ActivatedRoute, ) {

    this.activatedRoute.queryParams.subscribe(params => {
      let id = JSON.parse(params['cate']);
      this.allCateList = JSON.parse(localStorage.getItem('allCateList'));

      
      this.allCateList.forEach(ele =>{
        ele['children'].forEach(val =>{
          if(id == val.id){
            this.firstLvl = ele;
            this.secondLvl = val;
            this.lastLvl = val['children']
          }
        })
      })

    });
  }

  ngOnInit() {
  }

  goAllModel(id){
    this.router.navigate(['/goods/all-model'],{queryParams:{cate:id}})
  }

  goGoodsList(id){
    this.router.navigate(['/goods/goods-list'],{queryParams:{cate:id}})
  }
}
