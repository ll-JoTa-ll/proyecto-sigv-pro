import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BusquedaGlobalComponent } from './components/busqueda-global/busqueda-global.component';
import { VuelosComponent } from './components/busqueda-global/vuelos/vuelos.component';
import { HotelesComponent } from './components/busqueda-global/hoteles/hoteles.component';
import { BusesComponent } from './components/busqueda-global/buses/buses.component';
import { PaquetesComponent } from './components/busqueda-global/paquetes/paquetes.component';
import { SegurosComponent } from './components/busqueda-global/seguros/seguros.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  { path: 'home', component: BusquedaGlobalComponent, runGuardsAndResolvers: 'always' },
  { path: 'vuelos', component: VuelosComponent, runGuardsAndResolvers: 'always' },
  { path: 'hoteles', component: HotelesComponent, runGuardsAndResolvers: 'always' },
  { path: 'buses', component: BusesComponent, runGuardsAndResolvers: 'always' },
  { path: 'paquetes', component: PaquetesComponent, runGuardsAndResolvers: 'always' },
  { path: 'seguros', component: SegurosComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
