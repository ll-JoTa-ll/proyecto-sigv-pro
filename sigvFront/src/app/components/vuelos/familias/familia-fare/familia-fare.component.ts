import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-familia-fare',
  templateUrl: './familia-fare.component.html',
  styleUrls: ['./familia-fare.component.sass']
})
export class FamiliaFareComponent implements OnInit {

  @Input() fareFamily;
  @Input() currency;
  @Input() fareFamilyIndex;

  constructor() { }

  ngOnInit() {
  }

}
