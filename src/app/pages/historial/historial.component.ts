import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransferenciaService } from 'src/app/services/transferencia.service';

interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements AfterViewInit {

  historial: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre','rut','banco','tipoCuenta','monto'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  constructor(private transferenciaServices: TransferenciaService) { }

  ngAfterViewInit(): void {
    this.transferenciaServices.getHistorial()
    .subscribe((data : any)=>{
      this.historial = new MatTableDataSource<any>(data);
      this.historial.paginator = this.paginator;
      
    });
  }

}
