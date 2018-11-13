import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'app';
  email: string;
  id: string;

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.email = localStorage.getItem('USER_EMAIL');
    this.id = localStorage.getItem('USER_ID');
  }
}
