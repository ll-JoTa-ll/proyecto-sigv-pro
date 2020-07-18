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
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
defineLocale('es', esLocale);
defineLocale('de', deLocale);
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
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
import { GetMenorPrecioPipe } from './pipes/get-menor-precio.pipe';
import { GetimghotelPipe } from './pipes/getimghotel.pipe';
import { FiltroEstrellasComponent } from './components/busqueda-global/hoteles/filtro-estrellas/filtro-estrellas.component';
import { FiltroNombrehotelComponent } from './components/busqueda-global/hoteles/filtro-nombrehotel/filtro-nombrehotel.component';
import { MapaHotelesComponent } from './components/busqueda-global/hoteles/mapa-hoteles/mapa-hoteles.component';
import { FormatoLongitudPipe } from './pipes/formato-longitud.pipe';
import { FamiliasComponent } from './components/vuelos/familias/familias.component';
import { FamiliaComponent } from './components/vuelos/familias/familia/familia.component';
import { FamiliaFareComponent } from './components/vuelos/familias/familia-fare/familia-fare.component';
import { GetmayorpricePipe } from './pipes/getmayorprice.pipe';
import { HabitacionComponent } from './components/busqueda-global/hoteles/habitacion/habitacion.component';
import { DetalleHabitacionComponent } from './components/busqueda-global/hoteles/habitacion/detalle-habitacion/detalle-habitacion.component';
import { PrecioFechaComponent } from './components/busqueda-global/hoteles/habitacion/precio-fecha/precio-fecha.component';
import { ReservaHotelComponent } from './components/busqueda-global/hoteles/reserva-hotel/reserva-hotel.component';
import { ContactoComponent } from './components/busqueda-global/hoteles/reserva-hotel/contacto/contacto.component';
import { DetalleCompraComponent } from './components/busqueda-global/hoteles/reserva-hotel/detalle-compra/detalle-compra.component';
import { DetallePagoComponent } from './components/busqueda-global/hoteles/reserva-hotel/detalle-pago/detalle-pago.component';
import { PagoComponent } from './components/busqueda-global/hoteles/reserva-hotel/pago/pago.component';
import { TitularesReservaComponent } from './components/busqueda-global/hoteles/reserva-hotel/titulares-reserva/titulares-reserva.component';
import { ReservaVueloComponent } from './components/reserva-vuelo/reserva-vuelo.component';
import { DatosPasajeroComponent } from './components/reserva-vuelo/datos-pasajero/datos-pasajero.component';
import { PersonaContactoComponent } from './components/reserva-vuelo/persona-contacto/persona-contacto.component';
import { InfoAdicionalComponent } from './components/reserva-vuelo/info-adicional/info-adicional.component';
import { MotivoViajeComponent } from './components/reserva-vuelo/motivo-viaje/motivo-viaje.component';
import { PrecioFinalComponent } from './components/reserva-vuelo/precio-final/precio-final.component';
import { InfoVueloSectionComponent } from './components/reserva-vuelo/info-vuelo-section/info-vuelo-section.component';
import { InfoVueloSegmentComponent } from './components/reserva-vuelo/info-vuelo-segment/info-vuelo-segment.component';
import { ModalInfraccionPaxComponent } from './components/reserva-vuelo/modal-infraccion-pax/modal-infraccion-pax.component';
import { VuelosExcepcionPoliticaComponent } from './components/vuelos-excepcion-politica/vuelos-excepcion-politica.component';
import { ExVueloSectionComponent } from './components/vuelos-excepcion-politica/ex-vuelo-section/ex-vuelo-section.component';
import { ExVueloSegmentComponent } from './components/vuelos-excepcion-politica/ex-vuelo-segment/ex-vuelo-segment.component';
import { ExMisVuelosComponent } from './components/vuelos-excepcion-politica/ex-mis-vuelos/ex-mis-vuelos.component';
import { ExPoliticasInfrigidasComponent } from './components/vuelos-excepcion-politica/ex-politicas-infrigidas/ex-politicas-infrigidas.component';
import { ExPrecioAdultoComponent } from './components/vuelos-excepcion-politica/ex-precio-adulto/ex-precio-adulto.component';
import { InfoRecomendacionComponent } from './components/reserva-vuelo/info-recomendacion/info-recomendacion.component';
import { FormatearfechaPipe } from './pipes/formatearfecha.pipe';
import { ModalResumenVueloComponent } from './components/reserva-vuelo/modal-resumen-vuelo/modal-resumen-vuelo.component';
import { VueloSectionComponent } from './components/reserva-vuelo/vuelo-section/vuelo-section.component';
import { InfoSegmentComponent } from './components/reserva-vuelo/info-segment/info-segment.component';
import { InfoSegmentGroupComponent } from './components/reserva-vuelo/info-segment-group/info-segment-group.component';
import { MultipaisesComponent } from './components/busqueda-global/multipaises/multipaises.component';
import { MultipaisesPriceComponent } from './components/vuelos/multipaises-price/multipaises-price.component';
import { AddPaxCentralizadorComponent } from './components/vuelos/add-pax-centralizador/add-pax-centralizador.component';
import { RecomendacionPoliticasComponent } from './components/busqueda-global/vuelos/recomendacion-politicas/recomendacion-politicas.component';
import { ReservaCompraComponent } from './components/reserva-vuelo/reserva-compra/reserva-compra.component';
import { ResumenPasajeroComponent } from './components/reserva-vuelo/resumen-pasajero/resumen-pasajero.component';
import { ResumenEquipajeComponent } from './components/reserva-vuelo/resumen-equipaje/resumen-equipaje.component';
import { ResumenRegulacionesComponent } from './components/reserva-vuelo/resumen-regulaciones/resumen-regulaciones.component';
import { ReservaGeneradaComponent } from './components/reserva-vuelo/reserva-generada/reserva-generada.component';
import { AutorizadoresComponent } from './components/reserva-vuelo/reserva-generada/autorizadores/autorizadores.component';
import { PasajerosComponent } from './components/reserva-vuelo/reserva-generada/pasajeros/pasajeros.component';
import { MisReservasVueloComponent } from './components/reserva-vuelo/mis-reservas-vuelos/misreservas.component';
import { ReservaTicketComponent } from './components/reserva-vuelo/reserva-ticket/reserva-ticket.component';
import { FiltroSuperiorComponent } from './components/vuelos/filtro-superior/filtro-superior.component';
import { AprobacionReservaComponent } from './components/reserva-vuelo/aprobacion-reserva/aprobacion-reserva.component';
import { FiltroPrecioComponent } from './components/vuelos/filtro-precio/filtro-precio.component';
import { FiltroHorariosComponent } from './components/vuelos/filtro-horarios/filtro-horarios.component';
import { FiltroAerolineasComponent } from './components/vuelos/filtro-aerolineas/filtro-aerolineas.component';
import { FormatfechareservaPipe } from './pipes/formatfechareserva.pipe';
import { GestionReservaVueloComponent } from './components/reserva-vuelo/gestion-reserva-vuelo/gestion-reserva-vuelo.component';
import { FormatfechareservacreacionPipe } from './pipes/formatfechareservacreacion.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DetallevueloComponent } from './components/reserva-vuelo/aprobacion-reserva/detallevuelo/detallevuelo.component';
import { FechaformatPipe } from './pipes/fechaformat.pipe';
import { EmailformatPipe } from './pipes/emailformat.pipe';
import { FiltroPrecioHotelComponent } from './components/busqueda-global/hoteles/filtro-precio-hotel/filtro-precio-hotel.component';
import { ReservaGeneradaHotelComponent } from './components/busqueda-global/hoteles/reserva-generada-hotel/reserva-generada-hotel.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { VueloFamiliaSectionComponent } from './components/vuelos/familias/vuelo-familia-section/vuelo-familia-section.component';
import { VueloFamiliaSegmentComponent } from './components/vuelos/familias/vuelo-familia-segment/vuelo-familia-segment.component';
import { NavHeaderComponent } from './components/shared/nav-header/nav-header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BnNgIdleService } from 'bn-ng-idle';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { BusquedaMiniHabitacionComponent } from './components/busqueda-global/hoteles/busqueda-mini-habitacion/busqueda-mini-habitacion.component';
import { ModalSesionExpiradaComponent } from './components/shared/modal-sesion-expirada/modal-sesion-expirada.component';
import { ModalHotelesVaciosComponent } from './components/shared/modal-hoteles-vacios/modal-hoteles-vacios.component';
import { FormattimeairportPipe } from './pipes/formattimeairport.pipe';
import { SessionExpirationAlert, SessionInteruptService } from 'session-expiration-alert';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoHabitacionComponent } from './components/busqueda-global/hoteles/resultado-habitacion/resultado-habitacion.component';
import { ModalHabitacionErroneaComponent } from './components/shared/modal-habitacion-erronea/modal-habitacion-erronea.component';
import { SafePipe } from './pipes/safe.pipe';
import { ModalSesionExpiradaVuelosComponent } from './components/shared/modal-sesion-expirada-vuelos/modal-sesion-expirada-vuelos.component';
import { ModalCerrarSesionComponent } from './components/shared/modal-cerrar-sesion/modal-cerrar-sesion.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { IntlInputPhoneModule } from 'intl-input-phone';
import { ModalSesionWarningVuelosComponent } from './components/shared/modal-sesion-warning-vuelos/modal-sesion-warning-vuelos.component';
import { IgxInputGroupModule,IgxSliderModule } from 'igniteui-angular';
import { DetalleReservaHotelComponent } from './components/reserva-vuelo/detalle-reserva-hotel/detalle-reserva-hotel.component';
import { ModalAvisoSesionComponent } from './components/shared/modal-aviso-sesion/modal-aviso-sesion.component';
import { ModalFamiliasVaciasComponent } from './components/shared/modal-familias-vacias/modal-familias-vacias.component';
import { ModalHotelErroneoComponent } from './components/shared/modal-hotel-erroneo/modal-hotel-erroneo.component';
import { ModalCambiarPasswordComponent } from './components/shared/modal-cambiar-password/modal-cambiar-password.component';
import { ModalRecuperarPasswordComponent } from './components/shared/modal-recuperar-password/modal-recuperar-password.component';
import { FormatporcentajePipe } from './pipes/formatporcentaje.pipe';
import { HotelesPoliticasComponent } from './components/busqueda-global/hoteles/hoteles-politicas/hoteles-politicas.component';
import { ModalHabitacionHabComponent } from './components/busqueda-global/hoteles/habitacion/modal-habitacion-hab/modal-habitacion-hab.component';
import { ModalInfraccionCompraComponent } from './components/shared/modal-infraccion-compra/modal-infraccion-compra.component';
import { FiltrosMiniComponent } from './components/busqueda-global/hoteles/filtros-mini/filtros-mini.component';
import { AdministradorPasajerosComponent } from './components/administrador-pasajeros/administrador-pasajeros.component';
import { ResizeService } from './services/resize.service';
import { RegulacionesTramoComponent } from './components/busqueda-global/vuelos/recomendacion/regulaciones-tramo/regulaciones-tramo.component';
import { AdministradorGeneralComponent } from './components/administrador-general/administrador-general.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { AutorizacionCentroCostoComponent } from './components/administrador-general/autorizacion-centro-costo/autorizacion-centro-costo.component';
import { ModalErrorServiceComponent } from './components/shared/modal-error-service/modal-error-service.component';
import { FamiliaFareV2Component } from './components/vuelos/familias/familia-fare-v2/familia-fare-v2.component';

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
    GetMenorPrecioPipe,
    GetimghotelPipe,
    FiltroEstrellasComponent,
    FiltroNombrehotelComponent,
    MapaHotelesComponent,
    FormatoLongitudPipe,
    FamiliasComponent,
    FamiliaComponent,
    FamiliaFareComponent,
    GetmayorpricePipe,
    HabitacionComponent,
    DetalleHabitacionComponent,
    PrecioFechaComponent,
    ReservaHotelComponent,
    ContactoComponent,
    DetalleCompraComponent,
    DetallePagoComponent,
    PagoComponent,
    TitularesReservaComponent,
    ReservaVueloComponent,
    DatosPasajeroComponent,
    PersonaContactoComponent,
    InfoAdicionalComponent,
    MotivoViajeComponent,
    PrecioFinalComponent,
    InfoVueloSectionComponent,
    InfoVueloSegmentComponent,
    ModalInfraccionPaxComponent,
    VuelosExcepcionPoliticaComponent,
    ExVueloSectionComponent,
    ExVueloSegmentComponent,
    ExMisVuelosComponent,
    ExPoliticasInfrigidasComponent,
    ExPrecioAdultoComponent,
    InfoRecomendacionComponent,
    FormatearfechaPipe,
    ModalResumenVueloComponent,
    VueloSectionComponent,
    InfoSegmentComponent,
    InfoSegmentGroupComponent,
    MultipaisesComponent,
    MultipaisesPriceComponent,
    AddPaxCentralizadorComponent,
    RecomendacionPoliticasComponent,
    ReservaCompraComponent,
    ResumenPasajeroComponent,
    ResumenEquipajeComponent,
    ResumenRegulacionesComponent,
    ReservaGeneradaComponent,
    AutorizadoresComponent,
    PasajerosComponent,
    MisReservasVueloComponent,
    ReservaTicketComponent,
    FiltroSuperiorComponent,
    AprobacionReservaComponent,
    FiltroPrecioComponent,
    FiltroHorariosComponent,
    FiltroAerolineasComponent,
    ReservaGeneradaHotelComponent,
    FilterPipe,
    FormatfechareservaPipe,
    GestionReservaVueloComponent,
    FormatfechareservacreacionPipe,
    DetallevueloComponent,
    FechaformatPipe,
    EmailformatPipe,
    FiltroPrecioHotelComponent,
    VueloFamiliaSectionComponent,
    VueloFamiliaSegmentComponent,
    NavHeaderComponent,
    BusquedaMiniHabitacionComponent,
    ModalSesionExpiradaComponent,
    ModalHotelesVaciosComponent,
    FormattimeairportPipe,
    BusquedaMiniHabitacionComponent,
    ModalHotelesVaciosComponent,
    ModalSesionExpiradaComponent,
    ResultadoHabitacionComponent,
    ModalHabitacionErroneaComponent,
    SafePipe,
    ModalSesionExpiradaVuelosComponent,
    ModalSesionWarningVuelosComponent,
    DetalleReservaHotelComponent,
    ModalAvisoSesionComponent,
    ModalCerrarSesionComponent,
    ModalFamiliasVaciasComponent,
    ModalHotelErroneoComponent,
    PerfilUsuarioComponent,
    ModalCambiarPasswordComponent,
    ModalRecuperarPasswordComponent,
    FormatporcentajePipe,
    HotelesPoliticasComponent,
    ModalHabitacionHabComponent,
    ModalInfraccionCompraComponent,
    FiltrosMiniComponent,
    AdministradorPasajerosComponent,
    RegulacionesTramoComponent,
    AdministradorGeneralComponent,
    DashboardComponent,
    AutorizacionCentroCostoComponent,
    ModalErrorServiceComponent,
    FamiliaFareV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AutocompleteLibModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ScrollToModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaXMHgcWr4xnHihDztbEPvkzyRnRFV81A',
      libraries: ['places']
    }),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    SessionExpirationAlert.forRoot(),
    NgbModule,
    IntlInputPhoneModule,
    IgxInputGroupModule,
    IgxSliderModule,
    ChartModule
  ],
  entryComponents: [ ModalInfraccionCompraComponent,ModalSesionExpiradaComponent, ModalHotelesVaciosComponent, ModalHabitacionErroneaComponent, ModalSesionExpiradaVuelosComponent, ModalSesionWarningVuelosComponent, ModalAvisoSesionComponent, ModalFamiliasVaciasComponent,ModalHotelErroneoComponent,ModalCambiarPasswordComponent,ModalRecuperarPasswordComponent,ModalCerrarSesionComponent, ModalErrorServiceComponent],
  providers: [BnNgIdleService,ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
