export interface IDatosUser {
    userId: number;
    personId: number;
    orole: {
        id: number,
        description: string
    };
    firstName: string;
    lastName: string;
    odocument;
    nationality: string;
    email: string;
    phone: string;
    frequentFlyer: string;
    birthDate: string;
    lcostCenter: [
        {
            id: string,
            name: string
        }
    ];
    isVIP: boolean;
    gender: string;
}