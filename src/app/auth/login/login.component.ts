import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/core/interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', {static: true}) loginForm: NgForm;
  user: LoginUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    console.log(this.loginForm.value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6}$/;
    if (!this.validateEmail(this.loginForm.value.email)) {
      console.log('email is not valid');
      return false;
    }
    if (!this.validatePasswordFormat(this.loginForm.value.password)) {
      console.log('password pattern incorrect');
      return false;
    }

    // Prepare for api request and send info
    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    if (this.loginForm.valid) {
      console.log(this.user);
      this.authService.login(this.user).subscribe((res) => {
      });
    } else {
      console.log('Form is not valid')
    }

  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePasswordFormat(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,16}$/;
    return regex.test(password);
  }

}
