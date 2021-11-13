import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { BanksService } from 'src/app/services/banks.service';

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.css']
})
export class NuevoDestinatarioComponent implements OnInit {

  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  isEditable = false;
  banks: any[]=[];
  constructor(private _formBuilder: FormBuilder, private banksServices: BanksService) { }

  ngOnInit(): void {

    this.banksServices.getBanks()
    .subscribe((data : any)=>{
      console.log(data);
      this.banks = data.banks;
    })



    this.firstFormGroup = this._formBuilder.group({
      isvalidRut: ['', [Validators.required,]],
      isvalidNombre: ['', Validators.required],
      isvalidCorreo: ['', [Validators.required,Validators.email]],
    });
    this.secondFormGroup = this._formBuilder.group({
      isvalidBanco: ['', Validators.required],
      isvalidTipoCuenta: ['', Validators.required],
      isvalidNumCuenta: ['', Validators.required],  
    });
  }

}
