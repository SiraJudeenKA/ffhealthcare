import { Injectable } from '@angular/core';
import { loginDetails, userDetails } from './auth-constant/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }
  /**
   * State variable used to manage the user signup details;
   */
  userDetails: userDetails[] = [];
  /**
   * Method used to store the user details in session.
   * @param details has the signup form details
   * @returns boolean
   */
  signup(details: userDetails): boolean | string {
    try {
      let userDetails = sessionStorage.getItem('userDetails');
      if (!!userDetails) {
        this.userDetails = JSON.parse(userDetails);
      }
      if (this.userDetails?.length > 0) {
        let alreadyExists = this.userDetails?.find((res: userDetails) => res.email === details?.email);
        if (alreadyExists) {
          return 'Email id already exists, please try with someother mail id';
        } else {
          this.userDetails.push(details);
          if (this.userDetails?.length)
            sessionStorage.setItem('userDetails', JSON.stringify(this.userDetails));
        }
      } else {
        this.userDetails.push(details);
        sessionStorage.setItem('userDetails', JSON.stringify(this.userDetails));
      }
      return true;
    } catch (err) {
      return false;
    }

  }
  /**
   * Method used to check the login details
   * @param details has the login details
   * @returns boolean
   */
  loginCheck(details: loginDetails): boolean {
    try {
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
    } catch {
      return false;
    }

  }
}
