// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: "http://sigvplussecurity.azurewebsites.net/api",
  url_2: "http://sigvplusflight.azurewebsites.net/api",
  url_3: 'https://sigvplusflight.azurewebsites.net/api',
  url_4: 'https://sigvplusflight.azurewebsites.net/api/',
  url_5: 'https://sigvpluscustomer.azurewebsites.net/api/',
  cod_rol_autogestion: [3],
  cod_rol_centralizador: [5, 2]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
