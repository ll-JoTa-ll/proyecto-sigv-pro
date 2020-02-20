export class IRegulationsModel {
    text: [];
    lpassengerDetail: [
        {
            oPenaltiesInfo: {
                lPenalties: [
                    {
                        type: string;
                        applicability: string;
                        changeable: string;
                        refundable: string;
                        price: number;
                        currency: string;
                    }
                ]
            },
            oAdvancedPurchaseData: string;
        }
    ];
    oError: string;
}