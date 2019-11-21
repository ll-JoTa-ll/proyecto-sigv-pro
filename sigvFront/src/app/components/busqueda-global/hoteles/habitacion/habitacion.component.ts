import { Component, OnInit, Input, TemplateRef, Injectable, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
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

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.sass']
})
@Injectable()
export class HabitacionComponent implements OnInit, AfterViewInit {
  alertAt = 15;
  startTimer = true;

  lsthabitacion : IHabitacionResults;
  loginDataUser: ILoginDatosModel;
  Confirmacion : IGetEnhancedHotel;
  

  LHoteles: IHotelResultsModel;
 
  
  
  @Input() LlistaHotel: IHotelResultsModel[] = [];
  urlhotel: string;
  urlimg = './assets/images/hotel-icon.png';
  vistamapa: boolean = false;
  vistalistado: boolean = true;

  @Input() mayorPrecioHotel: number;
  @Input() menorPrecioHotel: number;
  
  slides: { image: string }[] = [];
  activeSlideIndex = 0;
  modalRef: BsModalRef;
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
  


  constructor(private router: Router,private bnIdle: BnNgIdleService,private sessionStorageService: SessionStorageService, private modalService: BsModalService,private service: HotelService,private spinner: NgxSpinnerService,private _scrollToService: ScrollToService) { 

    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.LHoteles = this.sessionStorageService.retrieve("ls_search_hotel");
    console.log(this.LHoteles);
    this.personas = this.LHoteles.numberPassenger;
    

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

  ngAfterViewInit() {
    console.log("(this.modalexpired: "+this.modalexpired);
    this.startCountDown(40, this.modalexpired);
  }

  
  
    startCountDown(seconds, template){
      var counter = seconds;
      var interval = setInterval(() => {
        console.log(counter);
        counter--;
        if (counter < 0 ) {
          clearInterval(interval);
          //alert("SI FUCIONA")
          this.modalRefSessionExpired = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray con-session-expired' })
          );
          //this.router.navigate(['login'])
        }	
      }, 1000);
    }

  VolverHome(){
    this.router.navigate(['hoteles'])
  }
    

  showHideMap($event) {
    this.mapafiltro = $event;
  }

  getChatMessages(){
    const config: ScrollToConfigOptions = {
      target: 'destination'
    };
    this._scrollToService.scrollTo(config);
  }

  Obtenerlistado($event) {
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
    console.log("this.contador ====>" +this.contador)
    console.log("this.contador ====>" +this.contador)
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

  

  Mostrarmapa() {
    $('#mapa').show();
 }
 
 OcultarMapa() {
   $('#mapa').hide();
 }

 
 

}
