import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor( private http:HttpClient) { }

  getBanks(){
    return this.http.get('https://bast.dev/api/banks.php');
  }
}
