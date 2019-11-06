import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HotelService } from '../../../../services/hotel.service';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { ReservaHotelComponent } from '../reserva-hotel/reserva-hotel.component';
import { ILoginDatosModel } from 'src/app/models/ILoginDatos.model';
import { environment } from '../../../../../environments/environment';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
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
  @Input() destinoValue: string;
  @Input() destinoText: string;
  @Input() dateingreso: string;
  @Input() datesalida: string;
  @Input() textoestrellas: string = 'Todas';
  @Input() habitaciones: string;
  @Input() LlistaHotel: IHotelResultsModel[] = [];
  @Input() personas: string;
  urlhotel: string;
  urlimg = '/assets/images/hotel-icon.png';
  vistamapa: boolean = false;
  vistalistado: boolean = true;

  @Input() mayorPrecioHotel: number;
  @Input() menorPrecioHotel: number;
  
  slides: { image: string }[] = [];
  activeSlideIndex = 0;
  modalRef: BsModalRef;

  
  @Input() urlHotel: string;
  @Input() estrellas: number;
  @Input() index: string;
  @Input() latitud: string;
  @Input() longitud: string;
  lhotel;

  constructor(private sessionStorageService: SessionStorageService, private modalService: BsModalService,private service: HotelService) { 
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg m-galeria' })
    )
  }

  Obtenerlistado($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;
    this.sessionStorageService.store("ls_search_hotel",this.LlistaHotel);
  }

  addSlide(): void {
    this.slides.push({
      image: `assets/images/nature/${this.slides.length % 8 + 1}.jpg`
    });
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }

  ngOnInit() {
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
    console.log(this.lsthabitacion);
  }

  

  Mostrarmapa() {
    $('#mapa').show();
 }
 
 OcultarMapa() {
   $('#mapa').hide();
 }

 
 

}
