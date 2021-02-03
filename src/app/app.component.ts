import { RegistrationService } from './registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReactiveFormsToutorial';

  registractionForm: FormGroup;

  get userName() {
    return this.registractionForm.get('userName');
  }

  get email() {
    return this.registractionForm.get('email');
  }

  get aleternativeEmails() {
    return this.registractionForm.get('aleternativeEmails') as FormArray;
  }

  addAleternativeEmail(){
    this.aleternativeEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {

  }

  ngOnInit() {
    this.registractionForm = this.fb.group({
      userName: ['Tomasz', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: ['tomasz@address.com'],
      subscribe: false,
      password: ['123'],
      confirmPassword: ['123'],
      address: this.fb.group({
        city: ['default'],
        state: ['default'],
        postalCode: ['default']
      }),
      aleternativeEmails: this.fb.array([])
    }, { validator: PasswordValidator });

    this.registractionForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registractionForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }



  loadApiData() {
    this.registractionForm.setValue({
      userName: 'Thomas',
      password: '123',
      confirmPassword: '123',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '000'
      }
    });
    // this.registractionForm.patchValue({
    //   userName: 'Thomas',
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //   }
    // });
  }

  onSubmit(){
    console.log(this.registractionForm.value);

    this._registrationService.register(this.registractionForm.value).subscribe(
      response => console.log("Success!", response),
      error => console.error("Error!", error)
    )
  }
}
