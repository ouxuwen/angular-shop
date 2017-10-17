import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bannerImg = [{url:"assets/image/banner-us-battery.jpg"},{url:"assets/image/iPhone8.jpg"},{url:"assets/image/banner-us-battery.jpg"},{url:"assets/image/iPhone8.jpg"}];
  defaultImg = 'assets/image/timg.gif';
  timer:any;
  left = 0;
  currentIndex = 0;


  productIndex= 0;




  @ViewChild('banner') banner:ElementRef;


  constructor() { }
  image = "https://www.etradesupply.com/skin/frontend/default/ets2015/images/banner/iPhone8.jpg";
  ngOnInit() {
   
  }

  ngAfterViewInit(){
     this.slider();
  }
  slider(){
  
    this.timer = setInterval(()=>{
      this.left -= 950;
      this.currentIndex+=1;
      if(this.left < (this.bannerImg.length-1) * 950 * -1){
        this.left = 0;
        this.currentIndex =0;
      }

      
      this.banner.nativeElement.style.marginLeft = this.left + 'px';
            console.log(this.banner.nativeElement.style.left);
    },4000)
  }

  bannerIn(){
    clearInterval(this.timer);
    this.timer = null;
    
  }
  bannerOut(){
    this.slider();
  }

  point(i){
    console.log(i)
    this.currentIndex = i;
    this.left = -1*i*950;
    this.banner.nativeElement.style.marginLeft = this.left + 'px';
  }

  btn(i){
    this.currentIndex += i;
   
    if(this.currentIndex>=this.bannerImg.length){
      this.currentIndex = 0;
    }else if (this.currentIndex < 0){
      this.currentIndex = this.bannerImg.length -1;
    }
     console.log(this.currentIndex)
    this.point(this.currentIndex);
  }
}
