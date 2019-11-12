

export interface ILoginDatosModel {
  userId: number;
  userName: string;
  userLastName: string;
  enviromentIsProd;
  userEmail;
  userPhone;
  userIsVIP;
  orole;
  oprofile;
  ocompany;
  lcostCenter;
  lpseudo;
  token;
  oerror: {
    message: string;
  }
}
