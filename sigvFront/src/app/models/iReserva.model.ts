export class IReservaModel {
        createdDate: string;
        pnr: string;
        timeLimit: string;
        travelRoute: string;
        createdUserId: number;
        userName: string;
        pseudo: string;
        ostate: {
            stateId: number;
            stateDescription: string;
        }
        numberAuthorizers: number;
        numberApproved: number;
}