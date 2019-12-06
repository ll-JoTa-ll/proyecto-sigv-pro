export class IHotelResultsModel {
        id: number;
        name: string;
        businessName: string;
        code: string;
        stars: number;
        address: string;
        cityName: string;
        numberNights: number;
        numberPassenger: number;
        startDate: string;
        endDate: string;
        isvisible;
        oposition: {
            latitude: number;
            longitude: number;
        };
        oairportDistance: {
            type: string;
            distance: string;
        };
        contactPhones: [];
        lamenities: [
            {
                code: string;
                description: string;
            }
        ];
        oprice: {
            pricePerNight: number;
            pricePerAllNights: number;
            currency: string;
        };
        guaranteeType: [];
        limagens: [
            {
                url: string;
                caption: string;
            }
        ];
        oerror:{
            message:string;
        };
        lpolicies: string;
        gds: string;
        pseudo: string;
}