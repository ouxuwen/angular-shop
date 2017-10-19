import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  cartCount:number = 0;
  showCart:boolean = false;
  
  hidden :boolean = false;
  notHome:boolean = false;


  constructor(public router : Router,private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    console.log(this.router)
    this.router.events
    .filter(event => event instanceof NavigationEnd)

    .subscribe((res) =>{
      if(res['url'] =='/' || res['url'] =='/home'){      
        this.notHome = false;
        this.hidden = false;

      }else{
        this.notHome = true;
        this.hidden = true;
      }
      console.log(res['url'])
    })
  }

  goHome(){
    this.router.navigateByUrl('/home');
  }
  
}
