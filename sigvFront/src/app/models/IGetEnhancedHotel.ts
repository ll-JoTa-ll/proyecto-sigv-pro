export class IGetEnhancedHotel {
    ohotel: {
        chainCode: string;
        code: string;
        cityCode: string;
        name: string;
        businessName: string;
    };
    oroom: {
        guarantee: string;
        ratePlan: string;
        paymentCards: [];
        lcancelPenalties: [
            {
                policyCode: string;
                nonRefundable: boolean;
                deadline: string;
                description: string;
                oprice: string;
            }
        ];
        checkIn: string;
        checkOut: string;
        startDate: string;
        endDate: string;
        bookingCode: string;
        roomType: string;
        ratePlanCode: string;
        name: string;
        lpricePerDay: [
            {
                startDate: string;
                endDate: string;
                price: number;
                currency: string;
            }
        ];
        oprice: {
            totalPrice: number;
            currency: string;
        }
    };
    osession: {
        sessionId: string;
        securityToken: string;
        sequenceNumber: string;
        transactionStatusCode: string;
    }
}