export class iGetReservation {
    pnr: string;
    reasonFlight: string;
    ostatus: {
        id: number;
        description: string;
    };
    gds: string;
    pseudo: string;
    numberPassengers: number;
    totalAmount: string;
    totalAmountByPassenger: string;
    totalDiscount: string;
    percentageDiscount: string;
    currency: string;
    isAuthorizer: boolean;
    timeLimit: string;
    comment: string;
    allowedIssue: boolean;
    allowedApproved: boolean;
    litineraries: [
        {
            numberSegment: number;
            ostatus: {
                id: number;
                description: number;
            },
            departureDate: string;
            departureTime: string;
            arrivalDate: string;
            arrivalTime: string;
            totalFlightTime: string;
            timeWaitAirport: string;
            origin: string;
            cityOrigin: string;
            airportOrigin: string;
            destination: string;
            cityDestination: string;
            airportDestination: string;
            carrier: string;
            carrierName: string;
            flightNumber: string;
            equipmentType: string;
            flightClass: string;
            cabinId: string;
            cabinDescription: string;
            fareBasis: string;
        }
    ];
    lpassenger: [
        {
            personId: number;
            firstName: string;
            lastName: string;
            documentType: string;
            documentNumber: string;
            birthDate: string;
            email: string;
            phone: string;
            gender: string;
        }
    ];
    lpolicies: [
        {
            policyId: number;
            name: string;
            message: string;
            impact: number;
            usersId: string;
        }
    ];
    lauthorizers: [
        {
            authorizerId: number;
            firstName: string;
            email: string;
            authorizationDate: string;
            ostatus: {
                id: number;
                description: string;
            },
            priority: number;
            comment: string;
        }
    ];
    message: string;
}