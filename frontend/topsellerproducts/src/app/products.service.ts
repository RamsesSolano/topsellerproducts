import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  getAllProducts(  ){
    const fullUrl = this.baseUrl + '/getTopSellers';
    return this.http.get( fullUrl );    
  }

  getIsTopSeller( sku: string ){
    const fullUrl = this.baseUrl + '/isTopSeller/' + sku
    return this.http.get( fullUrl );
  }

}
