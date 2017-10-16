import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  cartCount:number = 0;
  showCart:boolean = false;
  

  constructor() { }

  ngOnInit() {
  }

}
