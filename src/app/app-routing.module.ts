import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './pages/historial/historial.component';
import { NuevoDestinatarioComponent } from './pages/nuevo-destinatario/nuevo-destinatario.component';
import { TransferirComponent } from './pages/transferir/transferir.component';



const routes: Routes = [

  {path:'nuevoDestinatario',component:NuevoDestinatarioComponent},
  {path:'transferir',component:TransferirComponent},
  {path:'historial',component:HistorialComponent},
  {path:'**',pathMatch:'full',redirectTo:'reactive'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
