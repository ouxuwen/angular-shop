import { Injectable } from "@angular/core";
import { LoginService } from './loginService';
import { Http } from '@angular/http';
@Injectable()
export class LanguageService {

    constructor(public storage: Storage,public http: Http) {    
        
    }
    
   
}
