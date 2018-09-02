import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient,HttpParams } from '@angular/common/http';

import { CakeOrder } from '../models/cake.order.interface'; 
import { InitialData } from '../models/initial.data.interface'; 
import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs'; 

import { map, catchError } from 'rxjs/operators';

@Injectable()

export class CakeOrderService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  createCakeOrder(shapeCode:string,toppings:string,size:number,message:string) {
    let body = JSON.stringify({ shapeCode,toppings,size,message});  
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);
  
    return this.http.post(this.baseUrl + "/cake-orders",body,{headers});

  }  

  getInitialData():Observable<InitialData>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.get(this.baseUrl + "/new-order/initial-data",{headers})
    .pipe(map(response => response.json()),
    catchError(this.handleError));
  }

  calculateTotalPrice(shape:string,toppings:string,size:number,message:string): Observable<CakeOrder> {
    let body = JSON.stringify({ shape,toppings,size,message});  
    
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);
  
    return this.http.get(this.baseUrl + "/new-order/calculate-total-cost?shape=" + shape + "&toppings=" + toppings + "&size=" + size + "&message=" + message  ,{headers})
      .pipe(map(response => response.json()),
      catchError(this.handleError));

  }  
}
