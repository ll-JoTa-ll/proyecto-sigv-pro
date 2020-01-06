export class IHabitacionResults {
  ohotel : {
    hotelCode: string;
    hotelName: string;
    businessName: string;
    chainCode: string;
    cityCode: string;
    stars: number;
    cityName: string;
    address: string;
    hotelDescription: string;
    startDate: string;
    endDate: string;
    numberNights: number;
    lguestPerRoom: [
        {
            roomQuantity: string;
            numberPassengers: string;
            typePassenger: string;
        }
    ],
    lamenities: [
        {
            code: string;
            description: string;
        }
    ],
    oposition: {
        latitude: number;
        longitude: number;
    },
    limagens: [
        {
            url: string;
            caption: string;
        }
    ],
    checkIn: string;
    checkOut: string;
  };
  lroom: [
    {
        id: number;
        guaranteeType: string;
        paymentCards: [],
        oCancelPenalty: {
            code: string;
            deadline: string;
        },
        breakFast: boolean;
        bookingCode: string;
        roomType: string;
        ratePlanCode: string;
        lpricePerDay: [
            {
                startDate: string;
                endDate: string;
                price: number;
                currency: string;
            }
        ],
        description: string;
        lamenities: string;
        oprice: {
            basePrice: number;
            totalTax: number;
            totalPrice: number;
            currency: string;
        }
    }
  ];
  gds: string;
  contador: number;
  Oerror:{
    message: string;
  }
  pseudo: string;
    osession: {
        sessionId: string;
        securityToken: string;
        sequenceNumber: string;
        transactionStatusCode: string;
    }
}