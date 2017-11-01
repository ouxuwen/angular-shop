import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { HomeService } from '../../services/home.service';
import {　EventsService } from 'angular4-events'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  cartCount: number = 1;
  showCart: boolean = false;

  hidden: boolean = false;
  notHome: boolean = false;
  allCateList: any;
  isGettingCate: boolean = false;
  constructor(public eventsService : EventsService,public homeService: HomeService, public router: Router, private activatedRoute: ActivatedRoute, ) {
    this.eventsService.subscribe('cartEvents').subscribe(res =>{
      console.log(res);
    })
    this.getAllCateList();
   }

  ngOnInit() {
    console.log(this.router);
    
    this.router.events
      .filter(event => event instanceof NavigationEnd)

      .subscribe((res) => {
        if (res['url'] == '/' || res['url'] == '/home') {
          this.notHome = false;
          this.hidden = false;

        } else {
          this.notHome = true;
          this.hidden = true;
        }
        console.log(res['url'])
      })
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  getAllCateList() {
    this.isGettingCate = true;
    this.homeService.getIndex().map(res => res.json().data).subscribe(res => {
      this.isGettingCate = false;
      let arr = res['cate_list'];
      let newArr = [];
      arr.forEach(val => {
        if(val.pid == 0){
          newArr.push(val);
        }
      });
      newArr.forEach((val,i) => {
        newArr[i]['children'] = []
        arr.forEach((item,j )=>{
          if(item.pid == val.id){
            newArr[i]['children'].push(item);
          }
        })
      })

      newArr.forEach((val,i)=>{
        let child = val['children'];
        child.forEach((item,j)=>{
          newArr[i]['children'][j]['children']=[]
          arr.forEach((m,n)=>{
            if(m.pid == item.id){
              newArr[i]['children'][j]['children'].push(m)
            }
          })
        })
      })
      this.allCateList = newArr;
      console.dir(newArr)
      localStorage.setItem('allCateList',JSON.stringify(newArr));
      
    }, err => {
      this.isGettingCate = false;
    })
  }

  goOneLevel(id?){
    this.router.navigate(['/goods/all-model'], { queryParams: { cate: id} });
  }
  goTwoLevel(id?){
    this.router.navigate(['/goods/model'], { queryParams: { cate: id} });
  }
  goGoodsList(id?){
    this.router.navigate(['/goods/goods-list'],{ queryParams: { cate: id} })
  }

  goMyCart(){
    this.router.navigate(['/cart/cart']);
  }

  getCart(){

  }


}
