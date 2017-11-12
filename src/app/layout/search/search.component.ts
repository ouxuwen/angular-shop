import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { HomeService } from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  showCart: boolean = false;
  cartCount: number = 0;
  cartTotal = 0;
  cartList: any = [];
  hidden: boolean = false;
  notHome: boolean = false;
  allCateList: any;
  isGettingCate: boolean = false;
  isLogin: boolean = false;
  isSpinning: boolean = false;
  keywords:any;
  constructor(private confirmServ: NzModalService, public eventsService: EventsService, public homeService: HomeService, public router: Router, private activatedRoute: ActivatedRoute, ) {

    this.eventsService.subscribe('cart').subscribe(res => {
      this.getCart();
    })
    this.getAllCateList();
    if (localStorage.getItem('userInfo')) {
      this.getCart();
      this.isLogin = true;
    }

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
        if (val.pid == 0) {
          newArr.push(val);
        }
      });
      newArr.forEach((val, i) => {
        newArr[i]['children'] = []
        arr.forEach((item, j) => {
          if (item.pid == val.id) {
            newArr[i]['children'].push(item);
          }
        })
      })

      newArr.forEach((val, i) => {
        let child = val['children'];
        child.forEach((item, j) => {
          newArr[i]['children'][j]['children'] = []
          arr.forEach((m, n) => {
            if (m.pid == item.id) {
              newArr[i]['children'][j]['children'].push(m)
            }
          })
        })
      })
      this.allCateList = newArr;
      console.dir(newArr)
      localStorage.setItem('allCateList', JSON.stringify(newArr));

    }, err => {
      this.isGettingCate = false;
    })
  }

  goOneLevel(id?) {
    this.router.navigate(['/goods/all-model'], { queryParams: { cate: id } });
  }
  goTwoLevel(id?) {
    this.router.navigate(['/goods/model'], { queryParams: { cate: id } });
  }
  goGoodsList(id?) {
    this.router.navigate(['/goods/goods-list'], { queryParams: { cate: id } })
  }
  goGoodsDetail(id) {
    this.router.navigate(['/goods/goods-detail'], { queryParams: { goodsId: id } })
  }
  goMyCart() {
    this.router.navigate(['/cart/cart']);
  }

  goSearch(data?){
    if(data){
      this.router.navigate(['/goods/goods-list'], { queryParams: { keywords: data } })
    }else{
      this.router.navigate(['/goods/goods-list'], { queryParams: { keywords: this.keywords } })
    }
  
  }

  getCart() {
    this.isSpinning = true;
    this.homeService.cart_list().map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.cartList = res.data.list;
        this.cartCount = res.data.list.length;
        this.cartTotal = res.data.total_price;
      }
    }, err => {
      this.isSpinning = false;
    })
  }

  confirmDetele(id){
    this.confirmServ.confirm({
      title:"Are you sure to delete this one ?",
      okText:"Confirm",
      cancelText:"Cancel",
      onOk:()=>{
        this.deleteCartItem(id)
      }
    })
  }

  deleteCartItem(id) {
    this.isSpinning = true;
    let data = {
      id: id
    }
    this.homeService.delete_to_cart(data).map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.getCart();
        this.confirmServ.success({
          title: "Success",
          content: " Delete Success !",
          okText: "Confirm"
        })
      }
    }, err => {
      this.isSpinning = false;
    })
  }

}
