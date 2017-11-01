import { Component, OnInit } from '@angular/core';
import {　Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-allmodel',
  templateUrl: './allmodel.component.html',
  styleUrls: ['./allmodel.component.scss']
})
export class AllmodelComponent implements OnInit {

  allCateList: any;
  lastLvl: any;
  secondLvl: any;
  firstLvl: any;
  defaultImage = 'assets/image/lazyload.gif';
  constructor(public router:Router, public activatedRoute: ActivatedRoute, ) {

    this.activatedRoute.queryParams.subscribe(params => {
      let id = JSON.parse(params['cate']);
      this.allCateList = JSON.parse(localStorage.getItem('allCateList'));

      if(this.allCateList){
        
      
      this.allCateList.forEach(ele =>{
        
          if(id == ele.id){
            this.firstLvl = ele;
            this.secondLvl = ele['children'];
          
          }
        
      })
    }
    });
  }

  ngOnInit() {
  }
  goGoodsList(id){
    this.router.navigate(['/goods/goods-list'],{queryParams:{cate:id}})
  }

  goModel(id){
    this.router.navigate(['/goods/model'],{queryParams:{cate:id}})
  }
}
