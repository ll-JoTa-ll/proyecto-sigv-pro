export class IGetReservaDetalleHotel {
    cityCode: string;
    hotelName: string;
    endDate: string;
    starts: number;
    latitude: number;
    longitude: number;
    nameRoom: string;
    descriptionRoom: string;
    totalAmount: string;
    currency: string;
    namePassenger: string;
    lastNamePassenger: string;
    typePassenger: string;
    lhotelAmenity:[
        {
        code: number;
        description: string;
        }
    ];
    lroomlAmenity: [
        {
            code: number;
            description: string;
        }
    ];
    lcancelPenality:[]
}
