import { Component, OnInit,Input,Output,ViewChild,ElementRef } from '@angular/core';
import { HomeService} from '../../services/home.service';
import { EventsService } from 'angular4-events';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-order-box',
  templateUrl: './order-box.component.html',
  styleUrls: ['./order-box.component.scss']
})
export class OrderBoxComponent implements OnInit {

  defaultImg  = 'assets/image/timg.gif';
  constructor(private homeService: HomeService,private events:EventsService,private confirmServ: NzModalService) { }

  
  ngOnInit() {
    
  }

  
  
}
