import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competiciones',
  templateUrl: './competiciones.component.html',
  styles: [
  ]
})
export class CompeticionesComponent implements OnInit {

  cities: City[];
  value: Date;
  selectedCity:City;

  constructor() { }

  ngOnInit(): void {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

}


interface City {
  name: string,
  code: string
}
