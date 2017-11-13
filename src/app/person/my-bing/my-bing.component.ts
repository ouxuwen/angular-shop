import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bing',
  templateUrl: './my-bing.component.html',
  styleUrls: ['./my-bing.component.scss']
})
export class MyBingComponent implements OnInit {

  constructor() {
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
  }
  userInfo: any;
  ngOnInit() {
  }

}
