// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*
  url: "http://sigvplussecurity.azurewebsites.net/api",
  url_2: "http://sigvplusflight.azurewebsites.net/api",
  url_5: 'https://sigvpluscustomer.azurewebsites.net/api/',
  url_6: 'http://sigvplusnotification.azurewebsites.net/api/',*/
  cod_rol_autogestion: [3],
  cod_rol_centralizador: [5, 2],
  max_pax: 8,
  url: 'http://172.16.2.101:8100/api/',
  url_2: 'http://172.16.2.101:8130/api/',
  url_5: 'http://172.16.2.101:8110/api/',
  url_6: 'http://172.16.2.101:8140/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
