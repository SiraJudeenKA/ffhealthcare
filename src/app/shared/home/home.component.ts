import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

interface weatherDetails {
  name: string;
  icon: string;
  tempC: string;
  tempF: string
  date: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   * Stored the selected language
   */
  selectedLanguage: string = 'English'
  /**
   * form control for the city name.
   */
  cityName: FormControl = new FormControl(null);

  weatherDetails: weatherDetails = {
    name: 'Static locaion',
    icon: '//cdn.weatherapi.com/weather/64x64/day/266.png',
    tempC: '20',
    tempF: '30',
    date: '2024-07-26 18:15'
  };
  /**
   * Variable used to subscription object.
   */
  subscriptionObject: Subscription = new Subscription();
  /**
   * Used to inject your service to make the api call
   * @param sharedService 
   */
  constructor(private sharedService: SharedService, private matSnackBar: MatSnackBar,) { }

  /**
   * Oninit life cycle hook
   */
  ngOnInit() {
    this.subscriptionObject.add(this.sharedService.getlanguageDetails().subscribe({
      next: (res) => {
        this.sharedService.languageDetails = res;
        this.setLanguageDetailsValue('en');
      }
    }))
  }
  /**
   * Method used to set the language
   * @param code have code of language
   */
  setLanguageDetailsValue(code: string) {
    if (this.sharedService.languageDetails) {
      this.sharedService.currentLanguageDetails = this.sharedService.languageDetails[code]
    }
  }
  /**
   * Method used to store the getweather data.
   */
  getWeatherData(): void {
    if (this.cityName.value) {
      this.subscriptionObject.add(this.sharedService.getWeatherData(this.cityName.value).subscribe({
        next: (res: any) => {
          this.weatherDetails.name = res?.location?.name;
          this.weatherDetails.icon = res?.current?.condition?.icon;
          this.weatherDetails.tempC = res?.current?.temp_c;
          this.weatherDetails.tempF = res?.current?.temp_f
          this.weatherDetails.date = res?.location?.localtime
        },
        error: (e) => {
          this.matSnackBar.open(e?.error?.error?.message, 'Okay');
        }
      }))
    }
  }
  /**
   * Method used to select the language
   * @param language has the language
   */
  selectLanguage(language: string): void {
    this.selectedLanguage = language;
    this.setLanguageDetailsValue(language === 'English' ? 'en' : language === 'Tamil' ? 'ta' : 'tel')
  }

  ngOnDestroy(): void {
    this.subscriptionObject.unsubscribe();
  }

}
