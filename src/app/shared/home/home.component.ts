import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
/**
 * Interface for the weather details to display in UI.
 */
interface weatherDetails {
  name: string;
  icon: string;
  tempC: string;
  tempF: string
  date: string
  text: string
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
  /**
   * currently login user name
   */
  userName: string = ''
  /**
   * Default value for weather details
   */
  weatherDetails: weatherDetails = {
    name: 'India',
    icon: '//cdn.weatherapi.com/weather/64x64/day/266.png',
    tempC: '20',
    tempF: '30',
    date: '2024-07-26 18:15',
    text: 'Cloudy'
  };
  /**
   * Variable has the language code
   */
  langCode: string = 'en'
  /**
   * Variable used to subscription object.
   */
  subscriptionObject: Subscription = new Subscription();
  /**
   * Used to inject your service to make the api call
   * @param sharedService has access the shared service
   * @param matSnackBar has the snack bar data
   * @param router has the router to navigate.
   */
  constructor(private sharedService: SharedService,
    private matSnackBar: MatSnackBar, private router: Router) { }

  /**
   * Oninit life cycle hook
   */
  ngOnInit() {
    let details = this.sharedService.currentUser ? JSON.parse(this.sharedService.currentUser) : { name: 'Fore Front' };
    this.userName = details?.name;
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
      this.subscriptionObject.add(this.sharedService.getWeatherData(this.cityName.value, this.langCode).subscribe({
        next: (res: any) => {
          this.weatherDetails.name = res?.location?.name;
          this.weatherDetails.icon = res?.current?.condition?.icon;
          this.weatherDetails.tempC = res?.current?.temp_c;
          this.weatherDetails.tempF = res?.current?.temp_f
          this.weatherDetails.date = res?.location?.localtime;
          this.weatherDetails.text = res?.current?.condition?.text;
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
    this.langCode = language === 'English' ? 'en' : language === 'Tamil' ? 'ta' : 'te'
    this.selectedLanguage = language;
    this.setLanguageDetailsValue(this.langCode);
    this.getWeatherData()
  }
  /**
   * Method used to logout and navigate signin
   */
  onLogout(): void {
    this.router.navigate(['']);
  }
  /**
   * On destoy life cycle
   */
  ngOnDestroy(): void {
    this.subscriptionObject.unsubscribe();
    this.sharedService.currentLanguageDetails = {
      "Enter your city and click search to get live weather data": "Enter your city and click search to get live weather data",
      "Fahrenheit": "Fahrenheit",
      "Celsius": "Celsius",
      "Date": "Date",
      "Logout": "Logout",
      "Search": "Search",
      "English": "English",
      "Welcome": "Welcome"
    };
    this.sharedService.currentUser = null;
  }

}
