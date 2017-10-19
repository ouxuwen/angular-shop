import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //bannerImg = [{ url: "assets/image/banner-us-battery.jpg" }, { url: "assets/image/iPhone8.jpg" }, { url: "assets/image/banner-us-battery.jpg" }, { url: "assets/image/iPhone8.jpg" }];
  bannerImg = [];
  defaultImg = 'assets/image/timg.gif';
  timer: any;
  left = 0;
  currentIndex = 0;
  goods = [];
  // goods = [{
  //   id: 154,
  //   goods_name: "For Blackberry KEYone Keypad+Keypad Keyboard Replacement - Black - Grade S+	",
  //   cate_id: 10,
  //   price: "150.00",
  //   costprice: "1560.00",
  //   cover: 1198,
  //   url: "https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/small_image/135x/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Microsoft_Lumia_950_XL_LCD_Screen_and_Digitizer_Assembly_with_Front_Housing_Replacement_-_Black_-_Microsoft_Logo_-_Grade_S_0_.jpg"
  // },
  // {
  //   id: 153,
  //   goods_name: "For Blackberry KEYone Keypad+Keypad Keyboard Replacement - Black - Grade S+	",
  //   cate_id: 10,
  //   price: "100.00",
  //   costprice: "120.00",
  //   cover: 1191,
  //   url: "https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/small_image/135x/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Microsoft_Lumia_950_XL_LCD_Screen_and_Digitizer_Assembly_with_Front_Housing_Replacement_-_Black_-_Microsoft_Logo_-_Grade_S_0_.jpg"
  // },
  // {
  //   id: 152,
  //   goods_name: "For Blackberry KEYone Keypad+Keypad Keyboard Replacement - Black - Grade S+	",
  //   cate_id: 10,
  //   price: "300.00",
  //   costprice: "300.00",
  //   cover: 1186,
  //   url: "https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/small_image/135x/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Microsoft_Lumia_950_XL_LCD_Screen_and_Digitizer_Assembly_with_Front_Housing_Replacement_-_Black_-_Microsoft_Logo_-_Grade_S_0_.jpg"
  // }, {
  //   id: 112,
  //   goods_name: "For Blackberry KEYone Keypad+Keypad Keyboard Replacement - Black - Grade S+	",
  //   cate_id: 8,
  //   price: "29.00",
  //   costprice: "30.00",
  //   cover: 962,
  //   url: "https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/small_image/135x/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Microsoft_Lumia_950_XL_LCD_Screen_and_Digitizer_Assembly_with_Front_Housing_Replacement_-_Black_-_Microsoft_Logo_-_Grade_S_0_.jpg"
  // },
  // {
  //   id: 111,
  //   goods_name: "For Blackberry KEYone Keypad+Keypad Keyboard Replacement - Black - Grade S+	",
  //   cate_id: 8,
  //   price: "22.00",
  //   costprice: "24.00",
  //   cover: 960,
  //   url: "https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/small_image/135x/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Microsoft_Lumia_950_XL_LCD_Screen_and_Digitizer_Assembly_with_Front_Housing_Replacement_-_Black_-_Microsoft_Logo_-_Grade_S_0_.jpg"
  // },
  // {
  //   id: 110,
  //   goods_name: "For Blackberry KEYone Keypad+Keypad Keyboard Replacement - Black - Grade S+	",
  //   cate_id: 8,
  //   price: "16.00",
  //   costprice: "18.00",
  //   cover: 950,
  //   url: "https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/small_image/135x/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Microsoft_Lumia_950_XL_LCD_Screen_and_Digitizer_Assembly_with_Front_Housing_Replacement_-_Black_-_Microsoft_Logo_-_Grade_S_0_.jpg"
  // }]

  productIndex = 0;




  @ViewChild('banner') banner: ElementRef;


  constructor() { }
  image = "https://www.etradesupply.com/skin/frontend/default/ets2015/images/banner/iPhone8.jpg";
  ngOnInit() {

  }

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
