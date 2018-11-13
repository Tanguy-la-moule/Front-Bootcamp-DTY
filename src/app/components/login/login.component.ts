import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  snackbarText: string;
  registration_email: string;
  registration_password: string;
  username: string;
  login_email: string;
  login_password: string;
  users: User[];


  constructor(private authService: AuthService, private router: Router) { }

  register(registration_email, registration_password, username) {
    this.authService.register(registration_email, registration_password, username)
      .subscribe(res => {
        if (localStorage) {
          localStorage.setItem('USER_ID', res.user._id);
          localStorage.setItem('USER_TOKEN', res.user.token);
          localStorage.setItem('USER_EMAIL', res.user.email);
          this.router.navigate(['addSong']);
        }
        console.log(localStorage.getItem('USER_TOKEN'));
        console.log(localStorage.getItem('USER_ID'));
      },
    (err) => {
      this.showSnackBar('Registration error, this email is already taken by another user');
      this.registration_email = '';
      this.registration_password = '';
    });
  }

  login(login_email, login_password) {
    this.authService.login(login_email, login_password)
      .subscribe(res => {
        console.log(res.user);
        if (localStorage) {
          localStorage.setItem('USER_ID', res.user._id);
          localStorage.setItem('USER_TOKEN', res.user.token);
          localStorage.setItem('USER_EMAIL', res.user.email);
          this.router.navigate(['addSong']);
        }
        console.log(localStorage.getItem('USER_TOKEN'));
        console.log(localStorage.getItem('USER_ID'));
      },
    (err) => {
      this.showSnackBar('Login error, mistake in email or password');
      this.login_password = '';
    });
  }

  showSnackBar(message) {
    this.snackbarText = message;
    const x = document.getElementById('snackbar');
    x.className = 'show';
    setTimeout(function() {x.className = x.className.replace('show', ''); }, 3000);
}

  ngOnInit() {}
}
