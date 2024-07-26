import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from './shared.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  /**
   * Used to inject your service to make the api call
   * @param sharedService 
   */
  constructor(private sharedService: SharedService) { }

  transform(value: string, suffix: string): string {
    console.log(value, suffix, this.sharedService.currentLanguageDetails[value]);
    return this.sharedService.currentLanguageDetails[value];
  }

}
