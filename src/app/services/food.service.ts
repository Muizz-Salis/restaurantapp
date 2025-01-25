import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  public apiUrl = 'https://themealdb.p.rapidapi.com/search.php';
  public rapidApiKey = '73954000c2msh3ca2e8e0730dcd7p109231jsn02a6bf5f93f2';
  public rapidApiHost = 'themealdb.p.rapidapi.com';


  constructor(public http: HttpClient) { }

fetchFoodInfo(f: string) {
    const headers = new HttpHeaders({
      'X-Rapidapi-Key': this.rapidApiKey,
      'X-Rapidapi-Host': this.rapidApiHost,
    });

    const params = { f };

    return this.http.get(this.apiUrl, { params, headers });

}

};
