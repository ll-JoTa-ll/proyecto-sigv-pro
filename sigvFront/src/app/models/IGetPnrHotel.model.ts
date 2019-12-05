export class IGetPnrHotel {
    
    pnr: string;
    gds: string;
    createdDate: string;
    pseudo: string;
    oitineraryInfos: 
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
    };
    lpassengers:[{
        passengerId: string;
        personId: string;
        name: string;
        lastName: string;
        type: string;
        birthDate: string;
        documentType: string;
        documentNumber: string;
        emailAddress: string;
        phone: string;
        gender: string;
        codeConfirmation: string;
    }];
    email:[];
    numberPhone:[];
    oerror:{
        message:string;
    };
}