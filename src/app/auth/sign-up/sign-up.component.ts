import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterUser } from 'src/app/core/interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('f', {static: true}) registerForm: NgForm;

  user: RegisterUser
  constructor (private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp() {
    console.log(this.registerForm.value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,16}$/;
    // check password 
    let pass = this.registerForm.value.password;
    if (!this.validateEmail(this.registerForm.value.email)) {
      console.log('email format is invalid');
      return false;
    }
    if (!regex.test(pass)) {
      console.log('password pattern incorrect')
      return false
    }
    if (pass !== this.registerForm.value.confPassword) {
      console.log('password misatch');
      return false;
    } else {
      if(!regex.test(pass)) {
        console.log('password pattern incorrect')
        return false;
      }
        console.log('everything is ok');
    }

    // prepare to send to Backend
    this.user = {
      firstname: this.registerForm.value.fname,
      middlename: this.registerForm.value.mname,
      lastname: this.registerForm.value.lname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    if (this.registerForm.valid) {
      this.authService.signUp(this.user).subscribe((res)=> {
      });
    } else {
      console.log('Form is not valid')
    }

  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  

}
