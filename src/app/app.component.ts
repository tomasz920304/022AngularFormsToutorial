import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.registractionForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: false,
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: ['default'],
        state: ['default'],
        postalCode: ['default']
      })
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
}
