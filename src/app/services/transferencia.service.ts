import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DestinatarioModel } from '../pages/model/destinatarioModel';
import { TransferenciaModel } from '../pages/model/transferenciaModel';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor( private http:HttpClient) { }

  getHistorial(){
    return this.http.get('http://localhost:8080/transferencia/historial');
  }

  saveTransferencia(transferencia: TransferenciaModel){
    return this.http.post('http://localhost:8080/transferencia/saveTransferencia',
    transferencia,{observe: 'response'});
  }
}
