// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // url: "http://apis-uat.domiruth.com/security/api/",
 //url_2: "http://apis-uat.domiruth.com/flight/api/",
 // url_hotel: "http://172.16.3.20:8084/api/",
  url: "https://sigvplussecurity.azurewebsites.net/api/",
  url_2: "https://sigvplusflight.azurewebsites.net/api/",
  url_5: 'https://sigvpluscustomer.azurewebsites.net/api/',
  url_6: 'https://sigvplusnotification.azurewebsites.net/api/',
  url_hotel: "http://sigvplushotel.azurewebsites.net/api/",
  url_usuario : "http://172.16.2.101:8110/api/",
  url_project :"http://localhost:4200",
  //url_5: 'http://apis-uat.domiruth.com/customer/api/',
  //url_6: 'http://apis-uat.domiruth.com/notification/api/',
  cod_rol_autogestion: [3],
  cod_rol_autorizador: [4],
  cod_rol_centralizador: [5, 2],
  max_pax: 8,
 // url: 'http://172.16.2.101:8100/api/',
 // url_2: 'http://172.16.2.101:8130/api/',
  //url_5: 'http://172.16.2.101:8110/api/',
 // url_6: 'http://172.16.2.101:8140/api/'
};
