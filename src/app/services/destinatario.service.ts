import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DestinatarioModel } from '../pages/model/destinatarioModel';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  constructor( private http:HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:8080/destinatarios/getAll');
  }

  saveDestinatario(destinatario: DestinatarioModel){
    return this.http.post('http://localhost:8080/destinatarios/saveDestinatario',
    destinatario,{observe: 'response'});
  }
}
