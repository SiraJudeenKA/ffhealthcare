import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  /**
   * Variable used to store the private key;
   */
  privateKey: string = 'fd01d47dd72e4f0e92195513242507'
  /**
   * Variable used to check the currently login user;
   */
  currentUser: string | null = null;
  /**
   * Maintain the language details
   */
  languageDetails!: any;
  /**
   * Object used to store the current language details.
   */
  currentLanguageDetails: any = {
    "Enter your city and click search to get live weather data": "Enter your city and click search to get live weather data",
    "Fahrenheit": "Fahrenheit",
    "Celsius": "Celsius",
    "Date": "Date",
    "Logout": "Logout",
    "Search": "Search",
    "English": "English"
  }

  /**
   * Method used to get the translate value from json in assets
   * @returns has return the observale of localization value
   */
  getlanguageDetails(): Observable<any> {
    return this.http.get('/assets/translate.json');
  }
  /**
   * Need to inject our service for make api call
   * @param http has the http call from the weather server
   */
  constructor(private http: HttpClient) { }

  /**
   * Method used to get the weather date
   * @param cityName has the city name
   * @returns 
   */
  getWeatherData(cityName: string): Observable<any> {
    return this.http.get(`http://api.weatherapi.com/v1/current.json?key=${this.privateKey}&q=${cityName}`)
  }
}
