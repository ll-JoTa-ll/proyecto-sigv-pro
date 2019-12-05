import { Component, OnInit, Input } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';

//import { ReservaHotelComponent } from '../../reserva-hotel/reserva-hotel.component';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { ILoginDatosModel } from '../../../../../models/ILoginDatos.model';
import { HotelService } from '../../../../../services/hotel.service';
import { environment } from '../../../../../../environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IGetUserById } from 'src/app/models/IGetUserById.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalHabitacionErroneaComponent } from '../../../../shared/modal-habitacion-erronea/modal-habitacion-erronea.component';

@Component({
  selector: 'app-detalle-habitacion',
  templateUrl: './detalle-habitacion.component.html',
  styleUrls: ['./detalle-habitacion.component.sass']
})
export class DetalleHabitacionComponent implements OnInit {

  @Input() lhabitaciones;
  @Input() index;
  @Input() breakFast;
  @Input() hotel;

  modalRefSessionExpired: BsModalRef;
  lsthabitacion : IHabitacionResults;
  Confirmacion : IGetEnhancedHotel;
  loginDataUser: ILoginDatosModel;
  User : IGetUserById;
  lhotel;
  habitacion;
  userId;
  constructor(
    private modalService: BsModalService,
    private service: HotelService,
    private sessionStorageService: SessionStorageService,
    //private confir: ReservaHotelComponent,
    private router: Router,
    private spinner: NgxSpinnerService,
    ) {
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.User = this.sessionStorageService.retrieve("ss_user");
    this.userId = this.loginDataUser.userId;
   }

  ngOnInit() {
    
    this.habitacion = this.sessionStorageService.retrieve("lstHabication");
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
    this.getUser();

  }

  getReservaHabitacion(RoomType,BookingCode,PlanCode){
    this.spinner.show();
    let data = {
    "Pseudo": "LIMPE2235",
    "CityCode": this.habitacion.ohotel.cityCode,
    "ChainCode": this.habitacion.ohotel.chainCode,
    "HotelCode": this.habitacion.ohotel.hotelCode,
    "StartDate": this.habitacion.ohotel.startDate,
    "EndDate": this.habitacion.ohotel.endDate,
    "RoomType": RoomType,
    "BookingCode": BookingCode,
    "LguestPerRoom": this.habitacion.ohotel.lguestPerRoom,
    "PlanCode": PlanCode,
    "Ocompany": this.loginDataUser.ocompany,
      "osession": this.habitacion.osession
    }

    

    this.service.GetConfirmacion(data).subscribe(
      data => {

        this.Confirmacion = data;
        
        
        this.sessionStorageService.store("confirmacion", this.Confirmacion);
      },
      err => {
        this.spinner.hide();
      
    },
   () => {
    //window.open(environment.url_project + "/reserva-habitacion-hotel");
    if (this.Confirmacion.oerror != null) {
      this.modalRefSessionExpired = this.modalService.show(ModalHabitacionErroneaComponent)
    }else{
      this.router.navigate(['/reserva-habitacion-hotel']);
    }
    
    this.spinner.hide();
    
   }
    )
  }

  getUser(){
    let data = {
      userId: this.userId
      }

      this.service.GetUser(data.userId).subscribe(
        result => {
  
          this.User = result;
          
          this.sessionStorageService.store("ss_user", this.User);
          //this.router.navigate(['/reserva-habitacion-hotel']);
        },
        err => {
          this.spinner.hide();
       
      },
     () => {

      
     }
      )
  }

}
