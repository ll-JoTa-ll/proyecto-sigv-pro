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

@Component({
  selector: 'app-detalle-habitacion',
  templateUrl: './detalle-habitacion.component.html',
  styleUrls: ['./detalle-habitacion.component.sass']
})
export class DetalleHabitacionComponent implements OnInit {

  @Input() lhabitaciones;
  @Input() index;

  lsthabitacion : IHabitacionResults;
  Confirmacion : IGetEnhancedHotel;
  loginDataUser: ILoginDatosModel;
  lhotel;
  habitacion;

  constructor(
    private service: HotelService,
    private sessionStorageService: SessionStorageService,
    //private confir: ReservaHotelComponent,
    private router: Router,
    private spinner: NgxSpinnerService,
    ) {
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
      this.habitacion = this.sessionStorageService.retrieve("lstHabication");
   }

  ngOnInit() {
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

    console.log("dataRequest: " + JSON.stringify(data));

    this.service.GetConfirmacion(data).subscribe(
      data => {

        this.Confirmacion = data;
        
        this.sessionStorageService.store("confirmacion", this.Confirmacion);

        window.open(environment.url_project + "/reserva-habitacion-hotel");
        //this.router.navigate(['/reserva-habitacion-hotel']);
      },
      err => {
        this.spinner.hide();
      console.log("ERROR: " + JSON.stringify(err));
    },
   () => {
    this.spinner.hide();
    
   }
    )
  }

}
