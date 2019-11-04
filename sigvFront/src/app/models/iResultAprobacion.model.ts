export class IResultAprobacionReserva {
    pnr: string;
    requiredApproval: boolean;
    pnrInQueue : boolean;
    oerror: {
        message: string;
    };
    lauthorizers: [
        {
            authorizerId: number;
            authorizerName: string;
            authorizerEmail: string;

        }
    ]
}