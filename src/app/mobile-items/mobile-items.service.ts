import { Injectable } from '@angular/core';
import { MobileItems } from './mobile-model/mobile-items.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileItemsService {
  // formData:MobileItems;
  readonly rootURL ='http://localhost:60474/api';
 

  constructor(private httpClient: HttpClient) { }
          /*this.http.get(this.rootURL +'/MobileItem')
      .toPromise()
      .then(res => this.list = res as MobileItems[]);*/
      //return this.httpClient.get<MobileItems[]>(this.rootURL + '/mobileitem');

      getMobileItems(): Observable<MobileItems[]> {
        return this.httpClient.get<MobileItems[]>(this.rootURL + '/mobileitem')
      }
     
      getAccItemsbyID(id:number): Observable<MobileItems> {
        return this.httpClient.get<MobileItems>(this.rootURL + '/mobileitem/'+id)
      }

      // postMobileItems(mobile: MobileItems): Observable<MobileItems>
      // {
      //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        
      //   return this.httpClient.post<MobileItems>(this.rootURL + '/mobileitem',mobile,{headers});
        
        
      // }
      
    }
  
  

