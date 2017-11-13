import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { EventsService } from 'angular4-events';
import { Observable, TimeoutError, Subscription } from "rxjs";
import { environment } from '../../environments/environment';
import { NzModalService } from 'ng-zorro-antd'
import { TranslateService } from '@ngx-translate/core';

const productApi = 'http://www.tygdsupply.com/app';
const debugApi = 'http://www.admin.com/app';
@Injectable()
export class HttpService {
  token: any;
  subscription: Subscription;
  constructor(public eventsService: EventsService, public translateService: TranslateService, public http: Http, private confirmServ: NzModalService) {
    this.initTranslate();

  }

  public cancel() {
    this.subscription && this.subscription.unsubscribe();
  }

  public request(url: string, options: RequestOptionsArgs): Observable<Response> {

    return Observable.create(observer => {
      const path = environment.production ? productApi + url : debugApi + url;

      this.subscription = this.http.request(path, options).subscribe(res => {
        if (res.json().status == 403) {
          this.eventsService.publish('needLogin');
          localStorage.getItem('userInfo') && localStorage.removeItem('userInfo');
          this.eventsService.publish('login');
        } else if (res.json().status == 0) {
          this.confirmServ.error({
            title: "Error",
            content: res.json().msg,
            okText: this.Confirm
          });
          observer.next(res)
        } else {
          observer.next(res)
        }


      }, err => {
        this.requestFailed(path, options, err);//处理请求失败
        observer.error(err); //返回错误信息
      });
    });
  }

  public get(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: HttpService.buildURLSearchParams(paramMap),
     
    }));
  }

  public post(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      }),
    
    }));
  }

  public postJson(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      search: HttpService.buildURLSearchParams(paramMap),
  
    }));
  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (localStorage.getItem('userInfo')) {
      let token = JSON.parse(localStorage.getItem('userInfo')).token;
      params.set("token", token);
    }
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      params.set(key, val);
    }



    return params;
  }


  ErrorTimeOut: string;
  Error0: string;
  Error404: string;
  Error500: string;
  ErrorNet: string;
  Confirm: string;
  initTranslate() {
    this.translateService.get("ErrorTimeOut").subscribe(res => { this.ErrorTimeOut = res });
    this.translateService.get("Error0").subscribe(res => { this.Error0 = res });
    this.translateService.get("Error404").subscribe(res => { this.Error404 = res });
    this.translateService.get("Error500").subscribe(res => { this.Error500 = res });
    this.translateService.get("ErrorNet").subscribe(res => { this.ErrorNet = res });
    this.translateService.get("Confirm").subscribe(res => { this.Confirm = res });
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param options
   * @param err
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err): void {

    if (err instanceof TimeoutError) {
      this.confirmServ.error({
        title: this.ErrorTimeOut,
        okText: 'Confirm'
      });
      return;
    }
    let msg = '';
    switch (err.status) {
      case 0:
        msg = this.Error0;
        break;
      case 404:
        msg = this.Error404;
        break;
      case 500:
        msg = this.Error500;
        break;
      default:
        msg = this.ErrorNet;
    }
    this.confirmServ.error({
      title: msg,
      okText: this.Confirm
    });
  }

}
