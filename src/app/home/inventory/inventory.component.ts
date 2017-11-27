import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services';
import { NzModalService } from 'ng-zorro-antd';
import { EventsService } from 'angular4-events';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService, public router: Router, public activeRouter: ActivatedRoute) { }

  goodsList:any = [];
  ngOnInit() {
    this.getGoodList();
  }

  getGoodList(){
    this.homeService.getCateGoodsList().map(res => res.json()).subscribe(res =>{
      if(res.status == 1){
       this.goodsList = res.data.list.data
      }
    })
  }
  goDetail(id){
    
      this.router.navigate(['/goods/goods-detail'],{queryParams:{goodsId:id}})
    
  }
}
