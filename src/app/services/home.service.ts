import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { EventsService } from 'angular4-events';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class HomeService {
    constructor(private confirmServ: NzModalService, private router: Router, private _message: NzMessageService, private eventsService: EventsService, public httpService: HttpService) {

    }

    getIndex() {
        return this.httpService.get('/index');
    }

    getCateList() {
        return this.httpService.get('/index/cate_list');
    }

    getChildrenList(data) {
        return this.httpService.get('/index/children_cate_list', data);
    }

    /**
     * 
     * @param data 
     *  {keywords: 
        cate_id :
        is_new :
        is_rec :
        is_hot: }
     */
    getCateGoodsList(data?) {
        return this.httpService.get('/index/cate_goodslist', data);
    }

    /**
     * 商品详情
     */
    getGoodsInfo(data) {
        return this.httpService.get('/index/goods_info', data);
    }


    getGoodsGallery(data) {
        return this.httpService.get('/index/goods_gallery', data);
    }

    //收藏
    addGoodsCollect(data) {
        return this.httpService.postJson('/index/add_goods_collect', data);
    }

    deleteGoodsCollect(data) {
        return this.httpService.postJson('/index/delete_goods_collect', data);
    }



    login(data) {
        this.httpService.postJson('/member/login', data).subscribe(res => {

            if (res.json().status == 1) {
                localStorage.setItem('userInfo', JSON.stringify(res.json().data))
                this.eventsService.publish('login');
                this.eventsService.publish('cart');
                const modal = this.confirmServ.success({
                    title: 'Success',
                    content: `Welcome  ${res.json().data.firstname}`,
                    okText: "Confirm"
                });
                this.eventsService.publish('closeModel');
                setTimeout(() => modal.destroy(), 3000);

                if (this.router.url.indexOf('login')) {
                    this.router.navigate(['/home'])
                }
            }
        });

    }

    logOut() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo) {
            this.httpService.postJson('/base/login_out', { token: userInfo.token }).subscribe(res => {
                if (res.json().status == 1) {
                    localStorage.removeItem('userInfo');
                    this.eventsService.publish('login')
                    this._message.success(`GoodBye  ${userInfo.firstname}`, {
                        nzDuration: 3000
                    });
                }
            });
        }
        this.eventsService.publish('login');

    }
    register(data) {
        return this.httpService.postJson('/Member/register', data);
    }

    checkEmail(data) {
        return this.httpService.postJson('/Member/check_email', data);
    }

    goods_info(data) {
        return this.httpService.postJson('/index/goods_info', data);
    }

    delete_goods_collect(data) {
        return this.httpService.postJson('/index/delete_goods_collect', data);
    }

    list_goods_collect() {
        return this.httpService.postJson('/index/list_goods_collect');
    }

    add_goods_collect(data) {
        return this.httpService.postJson('/index/add_goods_collect', data);
    }

    add_to_cart(data) {
        return this.httpService.postJson('/cart/add_to_cart', data);
    }
    cutdown_to_cart(data) {
        return this.httpService.postJson('/cart/cutdown_to_cart', data);
    }
    delete_to_cart(data) {
        return this.httpService.postJson('/cart/delete_to_cart', data);
    }
    cart_list() {
        return this.httpService.postJson('/cart/cart_list');
    }
    update_cart_status(data) {
        return this.httpService.postJson('/cart/update_cart_status', data);
    }
    update_allcart_status(data) {
        return this.httpService.postJson('/cart/update_allcart_status', data);
    }

    updatePassword(data) {
        return this.httpService.postJson('/member/updatePassword', data);
    }

    list_address(data?) {
        return this.httpService.postJson('/member/list_address', data);
    }

    add_address(data) {
        return this.httpService.postJson('/member/add_address', data);
    }
    update_address(data) {
        return this.httpService.postJson('/member/update_address', data);
    }
    update_addres_before(data) {
        return this.httpService.postJson('/member/update_addres_before', data);
    }

    delete_address(data) {
        return this.httpService.postJson('/member/delete_address', data);
    }
    set_default_address(data) {
        return this.httpService.postJson('/member/set_default_address', data);
    }

    order_confirm(data) {
        return this.httpService.postJson('/order/order_confirm', data);
    }
    order_create(data) {
        return this.httpService.postJson('/order/order_create', data);
    }

    order_list(data?) {
        return this.httpService.postJson('/order/order_list', data);
    }
    order_cancel(data) {
        return this.httpService.postJson('/order/set_default_address', data);
    }
}   