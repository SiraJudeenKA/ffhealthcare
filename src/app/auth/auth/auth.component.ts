import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { userDetails } from '../auth-constant/user.model';
import { AuthConstant } from '../auth-constant/auth.constant';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends AuthConstant implements OnInit {
  /**
   * Variable used to declare the form group for the login page
   */
  loginFormGroup!: UntypedFormGroup;
  /**
   * Variable used to hide and unhide the password text
   */
  hide: boolean = true;
  /**
   * Variable used to display the gender details;
   */
  gender: string[] = ['Male', 'Female', 'Others'];
  /**
   * Variable used to hide the signup form details
   */
  hideSignup: boolean = true;
  /**
   * Variable used to save the new date.
   */
  today = new Date();
  /**
   * Constructor used to inject the service
   * @param authService used to check  user details correct
   * @param snackBar used to show the message.
   * @param router used to navigate the router
   * @param sharedService used to access the method of shared service.
   */
  constructor(private authService: AuthService, private sharedService: SharedService,
    private matSnackBar: MatSnackBar,
    private router: Router) {
    super()
  }

  /**
  * On init life cycle hook
  */
  ngOnInit(): void {
    this.loginFormGroup = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, Validators.required)
    });
    this.toSetFormControls();
  }
  /**
   * Method used to set the form controls
   */
  toSetFormControls() {
    if (!this.hideSignup) {
      this.loginFormGroup.addControl('name', new UntypedFormControl(null, Validators.required));
      this.loginFormGroup.addControl('address', new UntypedFormControl(null, Validators.required));
      this.loginFormGroup.addControl('dob', new UntypedFormControl(null, Validators.required));
      this.loginFormGroup.addControl('gender', new UntypedFormControl(null, Validators.required));
      this.loginFormGroup.get('password')?.addValidators([Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~!@#$%^])[A-Za-z\\d~!@#$%^]{8,20}$')]);
    } else {
      if (this.loginFormGroup?.get('name'))
        this.loginFormGroup.removeControl('name');
      if (this.loginFormGroup?.get('address'))
        this.loginFormGroup.removeControl('address');
      if (this.loginFormGroup?.get('dob'))
        this.loginFormGroup.removeControl('dob');
      if (this.loginFormGroup?.get('gender'))
        this.loginFormGroup.removeControl('gender');
      this.loginFormGroup.get('password')?.setValidators([Validators.required])
    }
    this.loginFormGroup.markAsUntouched();
    this.loginFormGroup.reset();
  }

  /**
   * Method used to navigate the login or signup based on conditions
   */
  onNavigate(): void {
    this.hideSignup = !this.hideSignup;
    this.toSetFormControls()
  }
  /**
   * Method used to store the signup details
   */
  signup(): void {
    if (this.loginFormGroup.valid) {
      let valueCheck: boolean | string = this.authService.signup(this.loginFormGroup.value);
      if (valueCheck) {
        if (valueCheck === 'Email id already exists, please try with someother mail id')
          this.matSnackBar.open(valueCheck, 'Okay');
        else {
          this.matSnackBar.open(this.warningMessage?.signupSuccess, 'Okay');
          this.onNavigate();
        }
      } else {
        this.matSnackBar.open(this.warningMessage?.signupFailed, 'Okay');
      }
    } else {
      this.matSnackBar.open(this.warningMessage?.allDetailsValid, 'Okay');
      this.loginFormGroup.markAllAsTouched();
    }
  }
  /**
   * Method used to check the login details
   */
  login(): void {
    if (this.loginFormGroup.valid) {
      if (this.authService.loginCheck(this.loginFormGroup.value)) {
        if (this.authService.userDetails?.length > 0) {
          const details = this.authService.userDetails?.find((res: userDetails) => res.email === this.loginFormGroup?.value?.email);
          this.sharedService.currentUser = JSON.stringify(details);
          this.router.navigate(['/home']);
        }
      } else {
        this.matSnackBar.open(this.warningMessage?.invalidLogin, 'Okay');
      }
    } else {
      this.matSnackBar.open(this.warningMessage?.validField, 'Okay');
      this.loginFormGroup.markAllAsTouched();
    }
  }

}
