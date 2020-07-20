import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { BusquedaGlobalComponent } from './components/busqueda-global/busqueda-global.component';
import { VuelosComponent } from './components/busqueda-global/vuelos/vuelos.component';
import { HotelesComponent } from './components/busqueda-global/hoteles/hoteles.component';
import { BusesComponent } from './components/busqueda-global/buses/buses.component';
import { PaquetesComponent } from './components/busqueda-global/paquetes/paquetes.component';
import { SegurosComponent } from './components/busqueda-global/seguros/seguros.component';
import { parse } from 'url';
import { HabitacionComponent } from './components/busqueda-global/hoteles/habitacion/habitacion.component';
import { ReservaHotelComponent } from './components/busqueda-global/hoteles/reserva-hotel/reserva-hotel.component';
import { ReservaVueloComponent } from './components/reserva-vuelo/reserva-vuelo.component';
import { VuelosExcepcionPoliticaComponent } from './components/vuelos-excepcion-politica/vuelos-excepcion-politica.component';
import { ReservaCompraComponent } from './components/reserva-vuelo/reserva-compra/reserva-compra.component';
import { ReservaGeneradaComponent } from './components/reserva-vuelo/reserva-generada/reserva-generada.component';
import { ReservaTicketComponent } from './components/reserva-vuelo/reserva-ticket/reserva-ticket.component';
import { MisReservasVueloComponent } from './components/reserva-vuelo/mis-reservas-vuelos/misreservas.component';
import { AprobacionReservaComponent } from './components/reserva-vuelo/aprobacion-reserva/aprobacion-reserva.component';
import { DetalleReservaHotelComponent } from './components/reserva-vuelo/detalle-reserva-hotel/detalle-reserva-hotel.component';
import { ReservaGeneradaHotelComponent } from './components/busqueda-global/hoteles/reserva-generada-hotel/reserva-generada-hotel.component';
import { GestionReservaVueloComponent } from './components/reserva-vuelo/gestion-reserva-vuelo/gestion-reserva-vuelo.component';
import { AdministradorPasajerosComponent } from './components/administrador-pasajeros/administrador-pasajeros.component';
import { AdministradorGeneralComponent } from './components/administrador-general/administrador-general.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AutorizacionCentroCostoComponent } from './components/administrador-general/autorizacion-centro-costo/autorizacion-centro-costo.component';
import { CargaMasivaComponent } from "./components/administrador/pasajeros/carga-masiva/carga-masiva.component";

const routes: Routes = [
  { path: '', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'home', component: BusquedaGlobalComponent, runGuardsAndResolvers: 'always' },
  { path: 'reportes', component: DashboardComponent, runGuardsAndResolvers: 'always' },
  { path: 'vuelos', component: VuelosComponent, runGuardsAndResolvers: 'always' },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent, runGuardsAndResolvers: 'always' },
  { path: 'administrador-pasajeros', component: AdministradorPasajerosComponent, runGuardsAndResolvers: 'always' },
  { path: 'administrador-general', component: AdministradorGeneralComponent, runGuardsAndResolvers: 'always' },
  { path: 'autorizacion-centro-costo', component: AutorizacionCentroCostoComponent, runGuardsAndResolvers: 'always' },
  { path: 'hoteles', component: HotelesComponent, runGuardsAndResolvers: 'always' },
  { path: 'buses', component: BusesComponent, runGuardsAndResolvers: 'always' },
  { path: 'paquetes', component: PaquetesComponent, runGuardsAndResolvers: 'always' },
  { path: 'seguros', component: SegurosComponent, runGuardsAndResolvers: 'always' },
  { path: 'habitacion', component: HabitacionComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-habitacion-hotel', component: ReservaHotelComponent, runGuardsAndResolvers: 'always'},
  { path: 'reserva-vuelo', component: ReservaVueloComponent, runGuardsAndResolvers: 'always' },
  { path: 'excepcion-vuelo', component: VuelosExcepcionPoliticaComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-vuelo-compra', component: ReservaCompraComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-generada-hotel', component: ReservaGeneradaHotelComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-generada-vuelo', component: ReservaGeneradaComponent, runGuardsAndResolvers: 'always' },
  { path: 'reserva-ticket-vuelo', component: ReservaTicketComponent, runGuardsAndResolvers: 'always' },
  { path: 'mis-reservas-vuelo', component: MisReservasVueloComponent, runGuardsAndResolvers: 'always' },
  { path: 'gestion-reserva-vuelo', component: GestionReservaVueloComponent, runGuardsAndResolvers: 'always' },
  { path: 'aprobar-reserva-vuelo', component: AprobacionReservaComponent, runGuardsAndResolvers: 'always' },
  { path: 'detalle-reserva-hotel', component: DetalleReservaHotelComponent, runGuardsAndResolvers: 'always' },
  { path: ':id', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'pasajeros/carga-masiva', component: CargaMasivaComponent, runGuardsAndResolvers: "always" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
