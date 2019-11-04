import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BusquedaGlobalComponent } from './components/busqueda-global/busqueda-global.component';
import { VuelosComponent } from './components/busqueda-global/vuelos/vuelos.component';
import { HotelesComponent } from './components/busqueda-global/hoteles/hoteles.component';
import { BusesComponent } from './components/busqueda-global/buses/buses.component';
import { PaquetesComponent } from './components/busqueda-global/paquetes/paquetes.component';
import { SegurosComponent } from './components/busqueda-global/seguros/seguros.component';
import { ReservaVueloComponent } from './components/reserva-vuelo/reserva-vuelo.component';
import {VuelosExcepcionPoliticaComponent} from './components/vuelos-excepcion-politica/vuelos-excepcion-politica.component';
import { ReservaCompraComponent } from './components/reserva-vuelo/reserva-compra/reserva-compra.component';
import { ReservaGeneradaComponent } from './components/reserva-vuelo/reserva-generada/reserva-generada.component';
import { ReservaTicketComponent } from './components/reserva-vuelo/reserva-ticket/reserva-ticket.component';
import { MisReservasVueloComponent } from './components/reserva-vuelo/mis-reservas-vuelos/misreservas.component';
import { AprobacionReservaComponent } from './components/reserva-vuelo/aprobacion-reserva/aprobacion-reserva.component';
import { GestionReservaVueloComponent } from './components/reserva-vuelo/gestion-reserva-vuelo/gestion-reserva-vuelo.component';

const routes: Routes = [
  { path: '', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'home', component: BusquedaGlobalComponent, runGuardsAndResolvers: 'always' },
  { path: 'vuelos', component: VuelosComponent, runGuardsAndResolvers: 'always' },
  { path: 'hoteles', component: HotelesComponent, runGuardsAndResolvers: 'always' },
  { path: 'buses', component: BusesComponent, runGuardsAndResolvers: 'always' },
  { path: 'paquetes', component: PaquetesComponent, runGuardsAndResolvers: 'always' },
  { path: 'seguros', component: SegurosComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-vuelo', component: ReservaVueloComponent, runGuardsAndResolvers: 'always' },
  { path: 'excepcion-vuelo', component: VuelosExcepcionPoliticaComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-vuelo-compra', component: ReservaCompraComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-generada-vuelo', component: ReservaGeneradaComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-ticket-vuelo', component: ReservaTicketComponent, runGuardsAndResolvers: 'always' },
  { path: 'mis-reservas-vuelo', component: MisReservasVueloComponent, runGuardsAndResolvers: 'always' },
  { path: 'gestion-reserva-vuelo', component: GestionReservaVueloComponent, runGuardsAndResolvers: 'always' },
  { path: 'aprobar-reserva-vuelo', component: AprobacionReservaComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
