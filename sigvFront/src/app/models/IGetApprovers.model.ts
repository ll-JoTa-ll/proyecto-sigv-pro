export class IGetApprovers {
    userId: number;
    priority: number;
    firstName: string;
    lastName: string;
    email: string;
    national: boolean;
    international: boolean;
    exception: boolean;
    reservation: boolean;
    approvalRange: boolean;
}