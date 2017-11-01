import { Component, OnInit,Input,Output,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-order-box',
  templateUrl: './order-box.component.html',
  styleUrls: ['./order-box.component.scss']
})
export class OrderBoxComponent implements OnInit {

  defaultImg  = 'assets/image/timg.gif';
  constructor() { }

  
  ngOnInit() {
    
  }

  
}
