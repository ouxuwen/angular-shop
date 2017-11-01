import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../services/home.service';
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
  goods = [{
    "id": 46,
    "goods_name": "For Apple iPhone X Tempered Glass Screen Protector (5D) Replacement (Without Package) - Black - Grade R\t",
    "cate_id": 62,
    "price": "11.00",
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
    "costprice": "21.00",
    "cover": 572,
    "url": "http://oyiph6mjm.bkt.clouddn.com/55e71d9fe966b03b95070293d33bcf93.png"
  }];
  productIndex = 0;
  @ViewChild('banner') banner: ElementRef;

  constructor(public homeService : HomeService ) { }
  
  ngOnInit() {
    this.getIndex();
  }

  getIndex(){
    this.homeService.getIndex().map(res => res.json().data).subscribe(res =>{
      this.bannerImg = res.ads1_list;
      console.log(this.bannerImg);
    })
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
      console.log(this.banner.nativeElement.style.left);
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
    console.log(i)
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
    console.log(this.currentIndex)
    this.point(this.currentIndex);
  }


}
