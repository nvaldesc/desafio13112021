import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.css']
})
export class NuevoDestinatarioComponent implements OnInit {

  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  isEditable = false;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
