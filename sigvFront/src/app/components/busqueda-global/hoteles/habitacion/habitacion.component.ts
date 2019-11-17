import { Component, OnInit, Input, TemplateRef} from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.sass']
})
export class HabitacionComponent implements OnInit {
  

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

  constructor(private router: Router,private bnIdle: BnNgIdleService,private sessionStorageService: SessionStorageService, private modalService: BsModalService,private service: HotelService,private spinner: NgxSpinnerService,private _scrollToService: ScrollToService) { 
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
    this.bnIdle.startWatching(480).subscribe((res) => {
      if(res) {
          console.log("session expired");
          alert("Session expired")
          this.router.navigate(['hoteles'])
      }
    })
    this.bnIdle.startWatching(1740).subscribe((res) => {
      if(res) {
          console.log("session expired");
          alert("session expired")
          this.router.navigate([''])
      }
    })
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.LHoteles = this.sessionStorageService.retrieve("ls_search_hotel");
    console.log(this.LHoteles);
    this.personas = this.LHoteles.numberPassenger;
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
