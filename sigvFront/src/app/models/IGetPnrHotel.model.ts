export class IGetPnrHotel {
    
    pnr: string;
    email:[];
    litineraryInfos: [
        {
            startDate: string;
            endDate: string;
            cityCode: string;
            hotelName: string;
            currency: string;
            priceTotal: string;
            numberPhone: [];
            descriptionRoom: [];
            penality: [];
        }
    ];
    lpassengers:[{
        lastName: string;
        name: string;
        phone: string;
    }];
    oerror:{
        message:string;
    };
    numberPhone:[];
}