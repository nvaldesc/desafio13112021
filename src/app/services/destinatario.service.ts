import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DestinatarioModel } from '../pages/model/destinatarioModel';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  constructor( private http:HttpClient) { }

  getAll(){
    return this.http.get('http://52.22.144.80:8085/destinatarios/getAll');
  }

  saveDestinatario(destinatario: DestinatarioModel){
    return this.http.post('http://52.22.144.80:8085/destinatarios/saveDestinatario',
    destinatario,{observe: 'response'});
  }
}
