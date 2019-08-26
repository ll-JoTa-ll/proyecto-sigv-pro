import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-recomendacion-section',
  templateUrl: './recomendacion-section.component.html',
  styleUrls: ['./recomendacion-section.component.sass']
})
export class RecomendacionSectionComponent implements OnInit, AfterViewInit {

  @Input() section;
  textType: string;
  @Input() sectionLength: number;

  constructor() { }

  ngOnInit() {
    console.log("ngOnInit");
    console.log("this.sectionLength");
    console.log(this.sectionLength);
    if (this.sectionLength === 1) {
      this.textType = 'Ida';
    }

    if (this.sectionLength === 2) {}

    if (this.sectionLength > 2) {}
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    console.log("this.sectionLength");
    console.log(this.sectionLength);
    if (this.sectionLength === 1) {
      this.textType = 'Ida';
    }

    if (this.sectionLength === 2) {}

    if (this.sectionLength > 2) {}
  }

}
