import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(public http:HttpClient) { }
  
  public baseUrl = environment.apiUrl

  public cartItem(obj:any){
    return this.http.post(`${this.baseUrl}addtocart.php`, obj)
  }

}
