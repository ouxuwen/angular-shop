
import { Api } from "./api";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";


@Injectable()
export class CouponApi extends Api{
    constructor(public http:Http){
        super(http)
    }

    getCouponList(data){
        return this.postBody("/coupon/page",data)
    };

    getShipList(){
        return this.getJson("/coupon/condition/ship/list")
    };

    getAgencyList(){
        return this.getJson("/coupon/condition/agency/list")
    };

    getSailList(data){
        return this.postJson("/coupon/condition/sail/list",data)
    };

    getCabinList(data){
        
        return this.postJson("/coupon/condition/cabinCategory/list",data);
    };

    createCoupon(data){
        return this.postBody("/coupon/create",data)
    };

    updateCoupon(data){
        return this.postBody("/coupon/update",data)
    };

    deleteCoupon(data){
        return this.getJson2("/coupon/delete",data)

    };

    viewCoupon(data){
        return this.getJson('/coupon/view',data)
    };

    couponUpdateStatus(data){
        return this.getJson("/coupon/updateStatus",data)
    }
}