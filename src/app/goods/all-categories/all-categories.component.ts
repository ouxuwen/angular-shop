import { Component, OnInit } from '@angular/core';
import { HomeService  } from '../../services/home.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  allCate:any = [
    {
      "id": 1,
      "pid": 0,
      "cate_name": "国产",
      "cover": 0,
      "create_time": 1486199792,
      "update_time": 0,
      "sort": 0,
      "status": 1,
      url:""
    },
    {
      "id": 2,
      "pid": 0,
      "cate_name": "进口",
      "cover": 0,
      "create_time": 1486199958,
      "update_time": 0,
      "sort": 0,
      "status": 1,
      url:""
    }
  ];
  defaultImage = 'assets/image/timg.gif';
  constructor(public homeService : HomeService,public router: Router) {
    this.getAllCate();
  }

  ngOnInit() {

  } 
 
  getAllCate(){
    this.homeService.getCateList().map(res => res.json().data).subscribe(res =>{
      console.log(this.allCate);
      this.allCate = res;
    })
      
  }

  goAllModel(id){
    this.router.navigate(['/goods/all-model'],{queryParams:{cate:id}})
  }
}
