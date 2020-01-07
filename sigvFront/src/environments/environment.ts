// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

 production: true,
  url: "https://sigvsecurity.azurewebsites.net/api/",
  url_2: "http://52.142.32.21/flights/api/",
  url_5: 'http://52.142.32.21/custom/api/',
  url_6: 'http://52.142.32.21/notify/api/',
  url_hotel: "http://52.142.32.21/hotel/api/",
  url_project :"https://localhost:4200",
  cod_rol_autogestion: [3],
  cod_rol_autorizador: [4],
  cod_rol_centralizador: [5, 2],
  max_pax: 8,
  url_usuario : "http://52.142.32.21/custom/api/"

  /*production: false,
  url:"https://sigvsecurityuat.azurewebsites.net/api/",
  url_2:"http://52.190.24.114/flights/api/",
  url_hotel: "http://52.190.24.114/hotel/api/",
  url_usuario : "http://52.190.24.114/custom/api/",
  url_project :"https://localhost:4200",
  url_5: 'http://52.190.24.114/custom/api/',
  url_6: 'http://52.190.24.114/notify/api/',
  cod_rol_autogestion: [3],
  cod_rol_autorizador: [4],
  cod_rol_centralizador: [5, 2],
  max_pax: 8*/
};
