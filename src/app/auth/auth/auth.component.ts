import { Component, OnInit } from '@angular/core';
import { AuthConstant } from '../auth.constant';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  hideSignup: boolean = true
  /**
   * Constructor used to inject the service
   * @param authService used to check the email and password is correct
   * @param userService used to store the current role details
   * @param snackBar used to show the message.
   * @param router used for navigation.
   */
  constructor(private router: Router) {
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
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$')])
    } else {
      if (this.loginFormGroup?.get('name'))
        this.loginFormGroup.removeControl('name');
      if (this.loginFormGroup?.get('address'))
        this.loginFormGroup.removeControl('address');
      if (this.loginFormGroup?.get('dob'))
        this.loginFormGroup.removeControl('dob');
      if (this.loginFormGroup?.get('gender'))
        this.loginFormGroup.removeControl('gender');
    }
  }

  /**
   * Method used to navigate the login or signup based on conditions
   */
  onNavigate(): void {
    this.hideSignup = !this.hideSignup;
    this.toSetFormControls()
  }

}
