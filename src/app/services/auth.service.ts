import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  register(email, password, username) {
    const newUser = {
      'user': {
        'email': email,
        'password': password,
        'username': username,
        'friends': '[]',
      }
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/users/register', newUser, {headers: headers})
      .pipe(map(res => {
        return res.json();
      }));
  }

  login(email, password) {
    const newUser = {
      'user': {
        'email': email,
        'password': password,
      }
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/users/login', newUser, {headers: headers})
      .pipe(map(res => {
        return res.json();
      }));
  }

  getUsers(userIDs) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get('http://localhost:8000/users/getUsers/' + userIDs)
      .pipe(map(res => res.json()));
  }

  findFriend(research) {
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.get('http://localhost:8000/users/user/' + research, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getCurrentUser(id) {
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.get('http://localhost:8000/users/current/' + id, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
