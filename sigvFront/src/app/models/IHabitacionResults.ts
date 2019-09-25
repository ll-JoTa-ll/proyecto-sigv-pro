export class IHabitacionResults {
    LPriceByRoom: [
        {
           fechainicio: string;
           fechaFin: string;
           precio: string;
           moneda: string;
           fechaInicioFormato: string;
           fechaFinFormato: string;
        }
       ];
       LGuaranteePayment: [
        {
           guaranteeType: string;
        }
       ];
       LCancelPenalty: [
         {
           PolicyCode: string;
           ODeadline: {
               AbsoluteDeadline: string;
               AbsoluteDeadlineFormat: string;
           }
         }
       ];
       // tslint:disable-next-line: variable-name
       value_description: string;
           // tslint:disable-next-line: variable-name
           value_room: string;
           // tslint:disable-next-line: variable-name
           value_penalty: string;
           policyCode: string;
           guaranteeType: string;
           guaranteeCode: string;
           marketCode: string;
           checkOutTime: string;
           // tslint:disable-next-line: variable-name
           roomType_Value: string;
           rph: string;
           ratePlanCode: string;
           ratePlanCategory: string;
           rateIndicator: string;
           GuaranteeType: string;
           BookingCode: string;
           RoomTypeCode: string;
           Name: string;
           AmountBeforeTax: string;
           AmountAfterTax: string;
           CurrencyCode: string;
           AgeQualifyingCode: string;
           availabilityStatus: string;
           effectiveDate: string;
           expireDate: string;
           sourceOfBusiness: string;
           Count: string;
           Start: string;
           End: string;
           StartDateWindow: string;
           EndDateWindow: string;
           Formatted: string;
           Image: string;
           URL: string;
           // tslint:disable-next-line: variable-name
           Name_Description: string;
           // tslint:disable-next-line: variable-name
           Room_ServiceDescriptions: string;
           priceProm: string;
}