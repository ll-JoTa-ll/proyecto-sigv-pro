import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  flagTipo: number;

  constructor(
    private router: Router
  ) {
    this.flagTipo = 1;
  }

  ngOnInit() {
  }

  cambiarTipo(valor) {
    console.log(valor);
    this.flagTipo = valor;

    switch (valor) {

      case 1:
        this.router.navigate(['/vuelos']);
        break;

      case 2:
        this.router.navigate(['/hoteles']);
        break;

      case 3:
        this.router.navigate(['/buses']);
        break;

      case 4:
        this.router.navigate(['/paquetes']);
        break;

      case 5:
        this.router.navigate(['/seguros']);
        break;

    }
  }

}
