export class IPnrConfirm {
    pnr: string;
    createdDate: string;
    pseudo: string;
    timeLimitShow;
    gds: string;
    reasonFlightId: number;
    timeLimit: string;
    lpassenger: [
        {
            passengerId: number;
            personId: number;
            name: string;
            lastName: string;
            type: string;
            birthDate: string;
            documentType: string;
            documentNumber: string;
            emailAddress: string;
            phone: string;
            gender: string;
        }
    ];
    lsegment: [
        {
            olocation: {
                origin: string;
                airportOrigin: string;
                destination: string;
                airportDestination: string;
            },
            odate: {
                departureDate: string;
                arrivalDate: string;
            },
            carrierId: string;
            flightNumber: string;
            classId: string;
            equipmentType: string;
            numberScales: number;
            ocarbonDioxide: {
                value: string;
                unit: string;
            },
            baggageAllowed: string;
            fareBasis: string;
            discount: string;
            fareFamily: string;
        }
    ];
    oamountInfo: {
        fareCalculation: string;
        currency: string;
        baseAmount: number;
        totalAmount: number;
        totalDiscount: number;
        percentageDiscount: number;
        ltaxes: [
            {
                amount: number;
                taxCountry: string;
            }
        ];
    }
    oerror: {
        message: string;
    };
}
