import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactiveFormsToutorial';

  get userName(){
    return this.registractionForm.get('userName');
  }

  constructor(private fb: FormBuilder) {

  }

  registractionForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
    password: ['default'],
    confirmPassword: ['default'],
    address: this.fb.group({
      city: ['default'],
      state: ['default'],
      postalCode: ['default']
    })
  });

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
