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
        lastname: string;
        name: string;
    }];
    oerror:{
        message:string;
    };
    numberPhone:[];
}