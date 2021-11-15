import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BanksService } from 'src/app/services/banks.service';
import { DestinatarioService } from 'src/app/services/destinatario.service';
import { BancoDestino, DestinatarioModel } from '../model/destinatarioModel';

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.css']
})
export class NuevoDestinatarioComponent implements OnInit {

  destinatario: DestinatarioModel = new DestinatarioModel();

  displayedTipocuenta: BancoDestino[] = [
    {id:"CC", name:'Cuenta Corriente'},
    {id:"CV", name:'Cuenta Vista'},
    {id:"CA", name:'Cuenta de Ahorro'}
  ];

  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  isEditable = true;
  banks: BancoDestino[]=[];
  constructor(private _formBuilder: FormBuilder, private banksServices: BanksService,
    private destinatarioService: DestinatarioService) { }

  ngOnInit(): void {

    this.banksServices.getBanks()
    .subscribe((data : any)=>{
      this.banks = data.banks;
    });
    this.iniciarGrupos();
    
  }

  validaFormDatos(){
    if(!this.firstFormGroup.invalid){
      this.destinatario.rut = this.firstFormGroup.get('rut')?.value;
      this.destinatario.nombre = this.firstFormGroup.get('nombre')?.value;
      this.destinatario.correo = this.firstFormGroup.get('correo')?.value;
      this.destinatario.telefono = parseInt(this.firstFormGroup.get('telefono')?.value);
    }

    if(!this.secondFormGroup.invalid){
      const idBanco = this.secondFormGroup.get('banco')?.value;
      const bank = this.banks.filter(bank => bank.id==idBanco);

      const idTipcuenta = this.secondFormGroup.get('tipoCuenta')?.value;
      const cuenta = this.displayedTipocuenta.filter(cuenta => cuenta.id==idTipcuenta);

      this.destinatario.bancoDestino = bank[0];
      this.destinatario.tipoCuenta = cuenta[0];

      this.destinatario.numCuenta = parseInt(this.secondFormGroup.get('numCuenta')?.value);
    }
    //console.log(this.destinatario);
  }


  newDestinatario(){
    this.validaFormDatos();
    this.destinatarioService.saveDestinatario(this.destinatario)
    .subscribe(
      response => {
        // You can access status:
        if(response.status==201){
          console.log(response.body?.toString())
        }else{
          alert("Error al registrar destinatario, favor vuelva a intentar")
        }
      }
    );

  }

  iniciarGrupos(){
    this.firstFormGroup = this._formBuilder.group({
      rut: ['', [Validators.required,Validators.pattern('^[0-9]+-[0-9kK]{1}$')]],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
      telefono: ['', ],
    });
    this.secondFormGroup = this._formBuilder.group({
      banco: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      numCuenta: ['', Validators.required],  
    });
  }

}
