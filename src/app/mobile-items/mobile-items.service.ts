import { Injectable } from '@angular/core';
import { MobileItems } from './mobile-model/mobile-items.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http } from '@angular/http';
import { Observable ,of} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MobileItemsService {
  // formData:MobileItems;
  readonly rootURL = 'http://localhost:60474/api';


  constructor(private httpClient: HttpClient, private http: Http) { }
  /*this.http.get(this.rootURL +'/MobileItem')
.toPromise()
.then(res => this.list = res as MobileItems[]);*/
  //return this.httpClient.get<MobileItems[]>(this.rootURL + '/mobileitem');

  getMobileItems(): Observable<MobileItems[]> {
    return this.httpClient.get<MobileItems[]>(this.rootURL + '/mobileitem')
  }

  getMobileItemsbyId(id: number): Observable<MobileItems> {
    if (id === 0){
      return of(this.empty());
    }
    return this.httpClient.get<MobileItems>(this.rootURL + '/mobileitem/' + id)

  }

  getMobileItemsbySearch(searchstring: string): Observable<MobileItems[]> {
    const newurl = `${this.rootURL}/mobileitem/search?searchstring=${searchstring}`;
    return this.httpClient.get<MobileItems[]>(newurl)
  }

  getMobileItemsbySort(sortstring: any): Observable<MobileItems[]>{
    const newurl = `${this.rootURL}/mobileitem/sort?sortorder=${sortstring}`;
    return this.httpClient.get<MobileItems[]>(newurl)


  }


  // getMobileItemsbySearch(searchstring:string,mobile:MobileItems):Observable<MobileItems>{
  //   return this.httpClient.get<MobileItems>(this.rootURL+ '/mobileitem/search' + searchstring)
  // }

  getAccItemsbyID(id: number): Observable<MobileItems> {
    if (id === 0){
      return of(this.empty());
    }
    return this.httpClient.get<MobileItems>(this.rootURL + '/mobileitem/' + id)
  }

  save(mobile: MobileItems): Observable<MobileItems> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    mobile.mobileItemsId = 0;
    return this.httpClient.post<MobileItems>(this.rootURL + '/mobileitem', mobile, { headers }).pipe(
      tap(data => console.log('AddMobile: ' + JSON.stringify(data))),
      map(() => mobile)

    );

  }

  update(id: number, mobile: MobileItems): Observable<MobileItems> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<MobileItems>(this.rootURL + '/mobileitem/' + mobile.mobileItemsId, mobile, { headers }).pipe(
      tap(data => console.log('UpdateMobile: ' + JSON.stringify(data))),
      map(() => mobile)

    );

  }
  deleteMobile(id:number):Observable<{}>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete<MobileItems>(this.rootURL +'/mobileitem/' + id, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id))
        
      );

  }
  private empty(): MobileItems{
    return{
      mobileItemsId : 0,
      mobileName: null,
      mobilePrice: null
    };
  }



}



