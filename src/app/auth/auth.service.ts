import { Injectable } from '@angular/core';
import { loginDetails, userDetails } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  /**
   * State variable used to manage the user signup details;
   */
  userDetails!: userDetails[] | null;
  /**
   * Method used to store the user details in session.
   * @param details has the signup form details
   */
  signup(details: userDetails): void {
    let userDetails = sessionStorage.getItem('userDetails');
    if (userDetails !== null) {
      this.userDetails = JSON.parse(userDetails);
    }
    this.userDetails?.push(details);
    sessionStorage.setItem('userDetails', JSON.stringify(this.userDetails));
  }
  /**
   * Method used to check the login details
   * @param details has the login details
   */
  loginCheck(details: loginDetails): boolean {
    let userDetails = sessionStorage.getItem('userDetails');
    if (userDetails !== null) {
      let flag: boolean = false
      this.userDetails = JSON.parse(userDetails);
      this.userDetails?.find((res: userDetails) => {
        if (res.email === details?.email && res.password === details?.password) {
          flag = true;
        }
      });
      return flag;
    } else {
      return false
    }
  }
}
