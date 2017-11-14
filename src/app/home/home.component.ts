import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bannerImg = [];
  defaultImage = 'assets/image/timg.gif';
  timer: any;
  left = 0;
  currentIndex = 0;
  isFinish:boolean = false;
  isSpinning: boolean = false;
  
  goods = [];
  productIndex = 0;
  @ViewChild('banner') banner: ElementRef;

  constructor(public router: Router,public homeService: HomeService) {
    this.getGoodsByClass("is_exc");
  }

  ngOnInit() {
    this.getIndex();
  }

  getIndex() {
    this.homeService.getIndex().map(res => res.json().data).subscribe(res => {
      this.bannerImg = res.ads1_list;
      console.log(this.bannerImg);
    })
  }


  getGoodsByClass(type) {
    this.isSpinning = true;
    let data = {};
    data[type] = 1;
    this.homeService.getCateGoodsList(data).map(res => res.json()).subscribe(res => {
      this.isSpinning = false;
      if (res.status == 1) {
        this.goods = res.data.list.data;
      }
    }, err => {
      this.isSpinning = false;
    }
    )
  }

  goGoodsList(id){
    this.router.navigate(['/goods/goods-list'],{queryParams:{
      type:id
    }})
  }



























  /**
   * banner control 
   */

  ngAfterViewInit() {
    this.slider();
  }
  slider() {
    this.timer = setInterval(() => {
      this.left -= 950;
      this.currentIndex += 1;
      if (this.left < (this.bannerImg.length - 1) * 950 * -1) {
        this.left = 0;
        this.currentIndex = 0;
      }
      this.banner.nativeElement.style.marginLeft = this.left + 'px';
      //console.log(this.banner.nativeElement.style.left);
    }, 4000)
  }


  bannerIn() {
    clearInterval(this.timer);
    this.timer = null;

  }
  bannerOut() {
    this.slider();
  }

  point(i) {
    //console.log(i)
    this.currentIndex = i;
    this.left = -1 * i * 950;
    this.banner.nativeElement.style.marginLeft = this.left + 'px';
  }

  btn(i) {
    this.currentIndex += i;

    if (this.currentIndex >= this.bannerImg.length) {
      this.currentIndex = 0;
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.bannerImg.length - 1;
    }
    //console.log(this.currentIndex)
    this.point(this.currentIndex);
  }


}
