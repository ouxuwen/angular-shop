import { Http, Response, URLSearchParams } from "@angular/http";
import { Subscription } from "rxjs/Subscription";


class ajaxPromise extends Promise<any> {
    
      public subscription: Subscription;
    
      public cancel() {
        if (this.subscription)
          this.subscription.unsubscribe();
      };
}
    

export class Api {
    constructor(public http : Http){}

    

    private enParams(json?: any,params?:URLSearchParams) {
      if (json)
        for (let key in json) {
          if(Object.prototype.toString.call(json[key]) ==="[object Object]"){
              this.enParams(json[key],params)
          }else if(Object.prototype.toString.call(json[key])==="[object Array]"){
            for (let item in json[key]){
              params.append(key,json[key][item]);
            }
              
          }
          else{
              params.append(key, json[key]);
          }
          
        }    
    }

    private encodeParams(json?:any){
        let params :URLSearchParams = new URLSearchParams();
        this.enParams(json,params);
        return params
    }


    private successHandler(response: Response, opts, resolve, reject) {
        let json = response.json();
        if (json.status){
          if(json.content){
            resolve(json.content);
          }else{
            resolve(json);
          }  
        }else{

          resolve({errMsg: json.errMsg,severity: json.severity});
        }
      }
    
    private errorHandler(error, opts, reject) {
        reject(error);
    }
    

    private request(opts):ajaxPromise {
        let subscription: Subscription = null;
        let path = "http://10.160.16.115:8086/cms"+opts.url  
        let promise = new ajaxPromise((resolve, reject) => {
          subscription = this.http.request(path, {
            method: opts.method,
            search: opts.search,
            body: opts.body,
          }).subscribe((response: Response) => {
            this.successHandler(response, opts, resolve, reject);
          }, error => {
            this.errorHandler(error, opts, reject);
          }, () => {
            
          });
        });
        promise.subscription = subscription;
        return promise;
    }

    public postJson(url, data?, search?): ajaxPromise {
        return this.request({
          method: 'POST',
          search: this.encodeParams(search),
          body: this.encodeParams(data),
          url: url,
          original: data,
        });
    }

    public getJson(url, data?, search?): ajaxPromise {
      console.log(this.encodeParams(data));
        return this.request({
          method: 'GET',
          search: this.encodeParams(search),
          body: this.encodeParams(data),
          url: url,
          original: data,
        });
     
    }

    public getJson2(url, data?, search?): ajaxPromise {
      console.log(this.encodeParams(data));
        return this.request({
          method: 'GET',
          search: this.encodeParams(data),
          url: url,
          original: data,
        });
     
    }

    public postBody(url, data?, search?): ajaxPromise {
        return this.request({
          method: 'POST',
          url: url,
          search: this.encodeParams(search),
          body: data,
          original: data,
        });
      }
}