import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/servicios/paises.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css'],
})
export class TablaPaisesComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  selectedCountry: any = null;
  searchText: string = '';

  constructor(private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.paisesService.getAllCountries().subscribe((data: any) => {
      this.countries = data;
      this.filteredCountries = this.countries;
    });
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.paisesService.setSelectedCountry(country); 
  }

  filterCountries() {
    if (!this.searchText) {
      this.filteredCountries = this.countries;
    } else {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
