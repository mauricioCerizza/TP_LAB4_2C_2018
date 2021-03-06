import { MesaBoardComponent } from './../Components/mesa-board/mesa-board.component';
import { PedidosBoardComponent } from './../Components/pedidos-board/pedidos-board.component';
import { EmpleadosBoardComponent } from './../Components/empleados-board/empleados-board.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaComponent } from '../Components/bienvenida/bienvenida.component';
import { EmpleadosComponent } from '../Components/empleados/empleados.component';
import { ClientesComponent } from '../Components/clientes/clientes.component';
import { EmpleadosLoginComponent } from '../Components/empleados-login/empleados-login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  {
    path: 'Login', component: EmpleadosLoginComponent
  },
  {
    path: 'Empleados',
    component: EmpleadosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Socio', 'Cocinero', 'Bartender', 'Cervecero', 'Mozo'] },
    children: [
      { path: '', redirectTo: 'Pedidos', pathMatch: 'full' },
      {
        path: 'Empleados',
        component: EmpleadosBoardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Socio'] }
      },
      {
        path: 'Pedidos',
        component: PedidosBoardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Socio', 'Cocinero', 'Bartender', 'Cervecero', 'Mozo'] }
      },
      {
        path: 'Mesas',
        component: MesaBoardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Socio', 'Mozo'] }
      },
    ]
  },
  {
    path: 'Clientes/:codMesa', component: ClientesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: [
  ]
})
export class AppRoutingModule { }
