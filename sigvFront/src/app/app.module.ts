import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale, esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
defineLocale('de', deLocale);

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
import { FiltrosComponent } from './components/busqueda-global/hoteles/filtros/filtros.component';
import { BusquedaMiniComponent } from './components/busqueda-global/hoteles/busqueda-mini/busqueda-mini.component';
import { ResultadoComponent } from './components/busqueda-global/hoteles/resultado/resultado.component';
import { FamiliasComponent } from './components/vuelos/familias/familias.component';
import { FamiliaComponent } from './components/vuelos/familias/familia/familia.component';
import { FamiliaFareComponent } from './components/vuelos/familias/familia-fare/familia-fare.component';
import { ReservaHotelComponent } from './components/reserva-hotel/reserva-hotel.component';
import { PagoComponent } from './components/reserva-hotel/pago/pago.component';
import { DetallePagoComponent } from './components/reserva-hotel/detalle-pago/detalle-pago.component';
import { TitularesReservaComponent } from './components/reserva-hotel/titulares-reserva/titulares-reserva.component';
import { DetalleCompraComponent } from './components/reserva-hotel/detalle-compra/detalle-compra.component';
import { ReservaVueloComponent } from './components/reserva-vuelo/reserva-vuelo.component';
import { DatosPasajeroComponent } from './components/reserva-vuelo/datos-pasajero/datos-pasajero.component';
import { PersonaContactoComponent } from './components/reserva-vuelo/persona-contacto/persona-contacto.component';
import { InfoAdicionalComponent } from './components/reserva-vuelo/info-adicional/info-adicional.component';
import { MotivoViajeComponent } from './components/reserva-vuelo/motivo-viaje/motivo-viaje.component';
import { PrecioFinalComponent } from './components/reserva-vuelo/precio-final/precio-final.component';
import { InfoVueloSectionComponent } from './components/reserva-vuelo/info-vuelo-section/info-vuelo-section.component';
import { InfoVueloSegmentComponent } from './components/reserva-vuelo/info-vuelo-segment/info-vuelo-segment.component';
import { ModalResumenComponent } from './components/reserva-vuelo/modal-resumen/modal-resumen.component';
import { ModalInfraccionPaxComponent } from './components/reserva-vuelo/modal-infraccion-pax/modal-infraccion-pax.component';
import { VuelosExcepcionPoliticaComponent } from './components/vuelos-excepcion-politica/vuelos-excepcion-politica.component';
import { ExVueloSectionComponent } from './components/vuelos-excepcion-politica/ex-vuelo-section/ex-vuelo-section.component';
import { ExVueloSegmentComponent } from './components/vuelos-excepcion-politica/ex-vuelo-segment/ex-vuelo-segment.component';
import { ExMisVuelosComponent } from './components/vuelos-excepcion-politica/ex-mis-vuelos/ex-mis-vuelos.component';
import { ExPoliticasInfrigidasComponent } from './components/vuelos-excepcion-politica/ex-politicas-infrigidas/ex-politicas-infrigidas.component';
import { ExPrecioAdultoComponent } from './components/vuelos-excepcion-politica/ex-precio-adulto/ex-precio-adulto.component';
import { ReservaGeneradaComponent } from './components/reserva-vuelo/reserva-generada/reserva-generada.component';
import { AutorizadoresComponent } from './components/reserva-vuelo/reserva-generada/autorizadores/autorizadores.component';
import { PasajerosComponent } from './components/reserva-vuelo/reserva-generada/pasajeros/pasajeros.component';
import { SolicitudAprobacionComponent } from './components/solicitud-aprobacion/solicitud-aprobacion.component';

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
    MultidestinosXsComponent,
    FiltrosComponent,
    BusquedaMiniComponent,
    ResultadoComponent,
    FamiliasComponent,
    FamiliaComponent,
    FamiliaFareComponent,
    ReservaHotelComponent,
    PagoComponent,
    DetallePagoComponent,
    TitularesReservaComponent,
    DetalleCompraComponent,
    ReservaVueloComponent,
    DatosPasajeroComponent,
    PersonaContactoComponent,
    InfoAdicionalComponent,
    MotivoViajeComponent,
    PrecioFinalComponent,
    InfoVueloSectionComponent,
    InfoVueloSegmentComponent,
    ModalResumenComponent,
    ModalInfraccionPaxComponent,
    VuelosExcepcionPoliticaComponent,
    ExVueloSectionComponent,
    ExVueloSegmentComponent,
    ExMisVuelosComponent,
    ExPoliticasInfrigidasComponent,
    ExPrecioAdultoComponent,
    ReservaGeneradaComponent,
    AutorizadoresComponent,
    PasajerosComponent,
    SolicitudAprobacionComponent
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
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
