import { Component, OnInit, Input, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { HotelService } from '../../../../services/hotel.service';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { ReservaHotelComponent } from '../reserva-hotel/reserva-hotel.component';
import { ILoginDatosModel } from 'src/app/models/ILoginDatos.model';
import { environment } from '../../../../../environments/environment';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { NgxSpinnerService } from 'ngx-spinner';
import { IGetPnrHotel } from 'src/app/models/IGetPnrHotel.model';
import { Router } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { BnNgIdleService } from 'bn-ng-idle';
import { Status } from 'tslint/lib/runner';
import { ModalSesionExpiradaComponent } from '../../../shared/modal-sesion-expirada/modal-sesion-expirada.component';
import { Window } from 'selenium-webdriver';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.sass']
})
export class HabitacionComponent implements OnInit, AfterViewInit {
  modalF5;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;

  lsthabitacion : IHabitacionResults;
  loginDataUser: ILoginDatosModel;
  Confirmacion : IGetEnhancedHotel;
  divwarning: boolean;
  currency: string;
  LHoteles: IHotelResultsModel;
  fechaSalida: string;
  fechaRetorno: string;

  localfinish;
  sessionFinish: boolean;
  
  
  @Input() LlistaHotel: IHotelResultsModel[] = [];
  urlhotel: string;
  urlimg = './assets/images/hotel-icon.png';
  vistamapa: boolean = false;
  vistalistado: boolean = true;

  @Input() mayorPrecioHotel: number;
  @Input() menorPrecioHotel: number;

  slides: { image: string }[] = [];
  activeSlideIndex = 0;
 
  isCollapsed = false;

  destinoValue: string;
  destinoText: string;
  cantidadnoche: string;
  textoestrellas: string = 'Todas';
  dateingreso: string;
  datesalida: string;
  habitaciones: string;
  personas: number;
  mapafiltro: boolean;
  showComponent: boolean = false;
  hideComponent: boolean = true;
  hoteles: IHotelResultsModel[] = [];

  @Input() urlHotel: string;
  @Input() estrellas: number;
  @Input() index: string;
  @Input() latitud: string;
  @Input() longitud: string;
  lhotel;
  texto1: string;
  texto2: string;
  texto3: string;
  contador: number;
  t: number;
  modalRefSessionExpired: BsModalRef;

  @ViewChild("modalexpired", {static: false}) modalexpired;


  constructor(private localStorageService: LocalStorageService,private router: Router,private sessionStorageService: SessionStorageService, private modalService: BsModalService,private spinner: NgxSpinnerService,private _scrollToService: ScrollToService) { 
    this.localfinish = this.localStorageService.retrieve("ss_countersession");
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.LHoteles = this.sessionStorageService.retrieve("ls_search_hotel");
    
    this.personas = this.LHoteles.numberPassenger;
    this.divwarning = false;
    console.log("localfinish" + this.localfinish);
    if (this.localfinish === false) {
      this.modalRefSessionExpired = this.modalService.show(ModalSesionExpiradaComponent,this.config);

    }



    // this.contador = 600;

    // this.bnIdle.startWatching(this.contador).subscribe((res) => {


    //   if(res) {

    //    alert("Session expired")
    //    this.router.navigate(['hoteles'])
    // }
    // });

    //  this.t = 0;
    //  let tt = this.t;
    //  setInterval(function(){
    //   console.log(tt++);
    //   sessionStorageService.store("ss_timer_hoteles_v1", tt);
    //  },1000);
  }


  
  
    startCountDown(seconds, template){
      var counter = seconds;
      var interval = setInterval(() => {
        counter--;
        console.log(counter);
        if (counter < 0 ) {
          clearInterval(interval);
          this.sessionFinish = false;
          this.localStorageService.store('ss_countersession',this.sessionFinish);
          this.modalRefSessionExpired = this.modalService.show(ModalSesionExpiradaComponent,this.config);
          //this.router.navigate(['login'])
        }	
      }, 1000);
    }
    

  VolverHome(){
    this.router.navigate(['hoteles'])
    this.modalexpired.hide();
  }

  noRefresh(){
    document.onkeydown = function(e){
      var tecla = (document.all) ? e.keyCode : e.which;
      if (tecla = 116) return false
      }
      
  }

  

  ngAfterViewInit() {
    console.log('ngOnInit hoteles');
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').hide();
    $('#menu-hotel-2').show();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
    this.startCountDown(600, this.modalexpired);
    console.log("cantidadnoche =====> " +this.cantidadnoche);
    this.sessionFinish = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg m-galeria' })
    )
  }


  showHideMap($event) {
    this.mapafiltro = $event;
  }

  ObtenerListFiltro($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;
    console.log("LlistaHotel =====>" + this.LlistaHotel);
  }

  MostrarMapa($event) {
    this.vistamapa = $event;
    this.vistalistado = false;
  }

  MostrarListado($event) {
    this.vistalistado = $event;
    this.vistamapa = false;
  }

  showComponente($event) {
    console.log("showComponente");
    console.log("$event: " + $event);
    this.showComponent = $event;
  }

  hideComponente($event) {
    console.log("hideComponente");
    console.log("$event: " + $event);
    this.hideComponent = $event;
  }

  listadoHoteles($event) {
    console.log("listadoHoteles");
    console.log("$event: " + $event);
    this.hoteles = $event;

  }

  getChatMessages(){
    const config: ScrollToConfigOptions = {
      target: 'destination'
    };
    this._scrollToService.scrollTo(config);
  }

  Obtenerlistado($event) {
    console.log("Obtenerlistado");
    console.log("dateingreso =====> " + this.dateingreso);
    console.log("dateingreso =====> " + this.dateingreso);
    console.log("dateingreso =====> " + this.dateingreso);
    console.log("dateingreso =====> " + this.dateingreso);
    console.log("dateingreso =====> " + this.dateingreso);
    console.log("dateingreso =====> " + this.dateingreso);
    console.log("$event: " + $event);
    console.log("");
    this.LlistaHotel = [];
    this.LlistaHotel = $event;

    let menorValor = 1000000;
    let mayorValor = 0;

    this.LlistaHotel.forEach(function(item) {
      if (item.oprice.pricePerAllNights < menorValor) {
        menorValor = item.oprice.pricePerAllNights;
      }
      if (item.oprice.pricePerAllNights > mayorValor) {
        mayorValor = item.oprice.pricePerAllNights;
      }

    });

    this.menorPrecioHotel = menorValor;
    this.mayorPrecioHotel = mayorValor;
    this.sessionStorageService.store("ls_search_hotel",this.LlistaHotel);
    this.mapafiltro = true;
  }

  addSlide(): void {
    this.slides.push({
      image: `assets/images/nature/${this.slides.length % 8 + 1}.jpg`
    });
  }

  leermar(){
    var texto, padre;
    $(".contenido").each(function(){
      texto = $(this).html();
      this.setAttribute("data-texto", texto);
      if ($(this).html().length > 75){
        $(this)
          .html(texto.substr(0, 75) + "...")
          .append($("<label class = 'mas'>Ver más</label>"));
      }
    });

    $(".mas").on("click", function(){
      padre = $(this).parent();
      texto = padre.data("texto");
      $(padre)
        .html(texto)
        .css({
          width: "50%",
          height: "5rem"
        });
    });
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }

  ngOnInit() {
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
    this.texto1 = this.lsthabitacion.ohotel.hotelDescription.substring(0,250);
    this.texto2 = this.lsthabitacion.ohotel.hotelDescription.substring(250,this.lsthabitacion.ohotel.hotelDescription.length);
    this.texto3 = this.lsthabitacion.ohotel.hotelDescription;
    this.lsthabitacion.contador = this.contador;

  }

  mostrarmas(){
    $('#description').html(this.texto3)
    $('#p2').css("display","block")
    $('#p1').css("display","none")
  }
  mostrarmenos(){
    $('#description').html(this.texto1)
    $('#p2').css("display","none")
    $('#p1').css("display","block")
  }

  ObtenerListaFiltroEstrella($event) {
    this.divwarning = false;
    this.LlistaHotel = [];
    this.LlistaHotel = $event;
    console.log("$event" + $event);
    if (this.LlistaHotel.length === 0) {
      this.divwarning = true;
    }
  }

  ObtenerListaFiltroPrecio($event) {
    this.divwarning = false;
    this.LlistaHotel = [];
    this.LlistaHotel = $event;

    if (this.LlistaHotel.length === 0) {
      this.divwarning = true;
    }

  }

  ObtenerListaFiltroNombre($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;

    if (this.LlistaHotel.length === 0) {
      this.divwarning = true;
    }

  }



  Mostrarmapa() {
    $('#mapa').show();
  }

  OcultarMapa() {
    $('#mapa').hide();
  }




}
