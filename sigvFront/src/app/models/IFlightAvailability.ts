export class IFlightAvailability {
    numberPassengers: number;
    totalFareAmount: number;
    fareAmountByPassenger: number;
    currency: string;
    ltaxes: [
        {
            totalPrice: string;
            currency: string;
            countryCode: string;
        },
        {
            totalPrice: string;
            currency: string;
            countryCode: string;
        }
    ];
    lfareReference: [
        {
            referenceType: string;
            uniqueReference: string;
        }
    ];
    odiscount: {
        realPrice: number;
        amount: number;
        percentage: number;
    }
    oerror: string;
    osession: {
        sessionId: string;
        securityToken: string;
        sequenceNumber: string;
        transactionStatusCode: number;
    }
}