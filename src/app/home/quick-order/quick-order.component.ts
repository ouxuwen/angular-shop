import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services';
import { NzModalService } from 'ng-zorro-antd';
import { EventsService } from 'angular4-events';
@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.scss']
})
export class QuickOrderComponent implements OnInit {

  constructor(private homeService: HomeService, private events: EventsService, private confirmServ: NzModalService, public router: Router, public activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.getBest('is_hot');
    this.getNew('is_new');
  }

  isImportFile: boolean = true;

  bestSell=[];
  newList=[];
  getNew(type) {
    
    let data = {};
    data[type] = 1;
    this.homeService.getCateGoodsList(data).map(res => res.json()).subscribe(res => {
    
      if (res.status == 1) {
        this.newList = res.data.list.data;
        this.newList = this.newList.splice(0,5);
      }
    }, err => {
    
    }
    )
  }
  getBest(type) {
    
    let data = {};
    data[type] = 1;
    this.homeService.getCateGoodsList(data).map(res => res.json()).subscribe(res => {
    
      if (res.status == 1) {
        this.bestSell = res.data.list.data;
        this.bestSell = this.bestSell.splice(0,3);
      }
    }, err => {
    
    }
    )
  }

  goGoodsDetail(id){
    this.router.navigate(['/goods/goods-detail'],{queryParams:{goodsId:id}})
  }
}
