import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../services'
@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  constructor(public router: Router, public activeRouter: ActivatedRoute,private homeService:HomeService) {
    this.activeRouter.queryParams.subscribe(res =>{
      this.goodsId = res['goodsId'];
      this.getGoodsInfo();
    })
    
  }
  isSpinning:boolean = false;
  goodsId:any;
  goodsInfo :any;
  ngOnInit() {
  }
  zoomedImageSrc ="https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Apple_iPhone_7_LCD_Screen_and_Digitizer_Assembly_with_Frame_Replacement_-_Black_-_Grade_S_2__1.jpg";
  smallImageSrc = "https://s3-us-west-2.amazonaws.com/usetsfiles/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/F/o/For_Apple_iPhone_7_LCD_Screen_and_Digitizer_Assembly_with_Frame_Replacement_-_Black_-_Grade_S_2__1.jpg";


  getGoodsInfo(){
    this.isSpinning = true;
    this.homeService.goods_info({info_id:this.goodsId}).map(res => res.json()).subscribe(res =>{
        this.goodsInfo= res.data;
        this.isSpinning = false;
    },err =>{
      this.isSpinning = false;
    })
  }
  data = {
    "msg": "ok",
    "status": 1,
    "data": {
      "goods_info": {
        "id": 48,
        "goods_name": "For Apple iPhone 8 Tempered Glass Screen Protector without Package (5D) - Black - Grade R",
        "sku": "Bi-71924465",
        "cate_id": 62,
        "brand_id": 0,
        "unit_id": 26,
        "keyword": "",
        "content": "",
        "is_new": 1,
        "is_rec": 1,
        "is_hot": 1,
        "price": "20.00",
        "costprice": "30.00",
        "fenxiao_rate": "1.00",
        "daili_rate": null,
        "sort": 0,
        "create_time": 1509552223,
        "update_time": 0,
        "putway": 1
      },
      "goods": {
        "id": 51,
        "info_id": 48,
        "sku": "Bi-23504157",
        "putway": 1,
        "price": "1.00",
        "costprice": "2.00",
        "barcode": "",
        "stbiknum": null,
        "stbikmax": null,
        "stbikmin": null,
        "standard_value1": "black",
        "standard_value2": "",
        "standard_value3": "",
        "standard_value4": "",
        "standard_value5": "",
        "fenxiao_rate": "1.00",
        "daili_rate": null,
        "create_time": 1509552223,
        "update_time": 0,
        "status": 1,
        "standard": [
          "black",
          0,
          0
        ]
      },
      "goods_list": [
        {
          "id": 51,
          "info_id": 48,
          "sku": "Bi-23504157",
          "putway": 1,
          "price": "1.00",
          "costprice": "2.00",
          "barcode": "",
          "stbiknum": null,
          "stbikmax": null,
          "stbikmin": null,
          "standard_value1": "black",
          "standard_value2": "",
          "standard_value3": "",
          "standard_value4": "",
          "standard_value5": "",
          "fenxiao_rate": "1.00",
          "daili_rate": null,
          "create_time": 1509552223,
          "update_time": 0,
          "status": 1
        },
        {
          "id": 52,
          "info_id": 48,
          "sku": "Bi-22830479",
          "putway": 1,
          "price": "1.00",
          "costprice": "2.00",
          "barcode": "",
          "stbiknum": null,
          "stbikmax": null,
          "stbikmin": null,
          "standard_value1": "while",
          "standard_value2": "",
          "standard_value3": "",
          "standard_value4": "",
          "standard_value5": "",
          "fenxiao_rate": "1.00",
          "daili_rate": null,
          "create_time": 1509552223,
          "update_time": 0,
          "status": 1
        }
      ],
      "gallery": [
        {
          "info_id": 48,
          "url": "http://oyiph6mjm.bkt.clouddn.com/931bae59a73584778799bfd10488981a.png"
        },
        {
          "info_id": 48,
          "url": "http://oyiph6mjm.bkt.clouddn.com/b5a8a83827aa3640601d759f320ac3a7.png"
        }
      ],
      "standard_list": [
        {
          "id": 2,
          "info_id": 48,
          "name": "color",
          "create_time": 1509552223,
          "update_time": 0,
          "value_list": [
            {
              "id": 3,
              "info_id": 48,
              "standard_id": 2,
              "standard_value": "black",
              "create_time": 1509552223,
              "update_time": 0,
              "status": 0
            },
            {
              "id": 4,
              "info_id": 48,
              "standard_id": 2,
              "standard_value": "while",
              "create_time": 1509552223,
              "update_time": 0,
              "status": 0
            }
          ]
        }
      ]
    }
  }
}
