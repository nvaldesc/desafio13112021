import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DestinatarioService } from 'src/app/services/destinatario.service';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import { DestinatarioModel } from '../model/destinatarioModel';
import { TransferenciaModel } from '../model/transferenciaModel';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent implements OnInit {

  destinatario!:DestinatarioModel;
  myControl = new FormControl();
  options: DestinatarioModel[] = [];
  filteredOptions!: Observable<DestinatarioModel[]>;

  myFormGroup: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder,
    private destinatarioService:DestinatarioService,
    private transferirService:TransferenciaService,
    private router:Router) { }


  ngOnInit(): void {

    console.log(this.destinatario);
    this.myFormGroup = this._formBuilder.group({
      nombre: ['', ],
      correo: ['', ],
      banco: ['', ],
      tipoCuenta: ['', ],
      monto:['', ],
    });


    this.destinatarioService.getAll()
    .subscribe((data : any)=>{
      this.options = data;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(String(value))),
    );

  }

  displayFn(user: DestinatarioModel): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): DestinatarioModel[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  seleccionar(){
this.destinatario = this.myControl.value;

this.myFormGroup.patchValue({
  nombre:this.destinatario.nombre,
  correo: this.destinatario.correo,
  banco: this.destinatario.bancoDestino.name,
  tipoCuenta: this.destinatario.tipoCuenta.name,

});

  }

  transferir(){

    const monto = this.myFormGroup.get('monto')?.value;

    if(this.destinatario!=null && monto>0){
      const transferencia = new TransferenciaModel();

      transferencia.nombre = this.destinatario.nombre;
      transferencia.bancoDestino = this.destinatario.bancoDestino;
      transferencia.monto = monto;
      transferencia.numCuenta = this.destinatario.numCuenta;
      transferencia.rut = this.destinatario.rut;
      transferencia.tipoCuenta = this.destinatario.tipoCuenta;
      transferencia.correo = this.destinatario.correo;
    this.transferirService.saveTransferencia(transferencia)
    .subscribe(
      response => {
        if(response.status==201){
          this.router.navigateByUrl("/historial");
        }else{
          alert("Error al realizar la transferencia, favor vuelva a intentar mas tarde");
        }
      }
    );

    }else{
      monto>0?alert("Monto a transferir debe ser mayor"):alert("Favor seleccionar destinatario");
    }


  }

}
