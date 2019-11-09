export class IGetUserById {
    userId: number;
    user:string;
    personId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    nationality: string;
    birthDate: string;
    gender: string;
    frequentFlyer:string;
    isVIP: boolean;
    orole: {
        id: number;
        description: string;
    };
    odocument: {
        type: string;
        description: string;
        number: string;
    };
    lcostCenter: [
        {
            id: number;
            name: string;
        }
    ]
    
}