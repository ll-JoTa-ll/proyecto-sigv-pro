import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precio-fecha',
  templateUrl: './precio-fecha.component.html',
  styleUrls: ['./precio-fecha.component.sass']
})
export class PrecioFechaComponent implements OnInit {
  @Input() lhabitaciones;
  constructor() { }

  ngOnInit() {
  }

}
