import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.sass']
})
export class FamiliaComponent implements OnInit {

  @Input() familia;

  constructor() { }

  ngOnInit() {
  }

}
