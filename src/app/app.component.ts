import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactiveFormsToutorial';

  constructor(private fb: FormBuilder) {

  }

  registractionForm = this.fb.group({
    userName: ['default'],
    password: ['default'],
    confirmPassword: ['default'],
    address: this.fb.group({
      city: ['default'],
      state: ['default'],
      postalCode: ['default']
    })
  });

  // registractionForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

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
