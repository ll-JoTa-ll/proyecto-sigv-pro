import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BusquedaGlobalComponent } from './components/busqueda-global/busqueda-global.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { VuelosComponent } from './components/busqueda-global/vuelos/vuelos.component';
import { RecomendacionComponent } from './components/busqueda-global/vuelos/recomendacion/recomendacion.component';
import { RecomendacionSectionComponent } from './components/busqueda-global/vuelos/recomendacion-section/recomendacion-section.component';
import { RecomendacionSegmentComponent } from './components/busqueda-global/vuelos/recomendacion-segment/recomendacion-segment.component';
import { RecomendacionSegmentGroupComponent } from './components/busqueda-global/vuelos/recomendacion-segment-group/recomendacion-segment-group.component';
import { FamiliaVueloComponent } from './components/shared/familia-vuelo/familia-vuelo.component';
import { BuscadorComponent } from './components/vuelos/buscador/buscador.component';
import { HotelesComponent } from './components/busqueda-global/hoteles/hoteles.component';
import { BusesComponent } from './components/busqueda-global/buses/buses.component';
import { PaquetesComponent } from './components/busqueda-global/paquetes/paquetes.component';
import { SegurosComponent } from './components/busqueda-global/seguros/seguros.component';
import { TxtAutocompletarComponent } from './components/shared/txt-autocompletar/txt-autocompletar.component';
import { MultidestinosLgComponent } from './components/shared/multidestinos-lg/multidestinos-lg.component';
import { MultidestinosXsComponent } from './components/shared/multidestinos-xs/multidestinos-xs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BusquedaGlobalComponent,
    HeaderComponent,
    VuelosComponent,
    RecomendacionComponent,
    RecomendacionSectionComponent,
    RecomendacionSegmentComponent,
    RecomendacionSegmentGroupComponent,
    FamiliaVueloComponent,
    BuscadorComponent,
    HotelesComponent,
    BusesComponent,
    PaquetesComponent,
    SegurosComponent,
    TxtAutocompletarComponent,
    MultidestinosLgComponent,
    MultidestinosXsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AutocompleteLibModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
