import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: Http) { }

  sendRequest(second_id) {
    const ids = {
      'first_id': localStorage.getItem('USER_ID'),
      'second_id': second_id,
    };
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN'), 'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/friendship/sendRequest', ids, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getFriendRequests() {
    const id = localStorage.getItem('USER_ID');
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.get('http://localhost:8000/friendship/getFriendRequests/' + id, {headers: headers})
      .pipe(map(res => res.json()));
    }

  getFriends() {
    const id = localStorage.getItem('USER_ID');
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.get('http://localhost:8000/friendship/getFriends/' + id, {headers: headers})
      .pipe(map(res => res.json()));
    }

  acceptFriendRequest(first_id) {
    const ids = {
      'first_id': first_id,
      'second_id': localStorage.getItem('USER_ID'),
    };
    console.log(ids);
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN'), 'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/friendship/acceptFriendRequest', ids, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getFriendship(second_id) {
    const ids = {
      'first_id': localStorage.getItem('USER_ID'),
      'second_id': second_id,
    };
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN'), 'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/friendship/getFriendship', ids, {headers: headers})
      .pipe(map(res => res.json()));
  }

  deleteFriendship(second_id) {
    const ids = {
      'first_id': localStorage.getItem('USER_ID'),
      'second_id': second_id,
    };
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN'), 'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/friendship/deleteFriendship', ids, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
