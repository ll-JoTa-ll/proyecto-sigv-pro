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
            numberPhone: string;
            descriptionRoom: string;
            penality: string;
            CodeConfirmation: string;
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