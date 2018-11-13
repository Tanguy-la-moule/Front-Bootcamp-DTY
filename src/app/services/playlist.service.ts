import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: Http) { }

  createPlaylist(name) {
    const newPlaylist = {
      'name': name,
      'creator_id': localStorage.getItem('USER_ID'),
    };
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN'), 'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/playlist/addPlaylist', newPlaylist, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getPlaylist() {
    const id = localStorage.getItem('USER_ID');
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.get('http://localhost:8000/playlist/allPlaylist/' + id, {headers: headers})
      .pipe(map(res => res.json()));
    }

  deletePlaylist(id) {
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.delete('http://localhost:8000/playlist/deletePlaylist/' + id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  addSongToPlaylist(playlistID, songID) {
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    const IDs = {
      'ids': {
        'playlistID': playlistID,
        'songID': songID,
      }
    };
    return this.http.post('http://localhost:8000/playlist/addSongToPlaylist', IDs, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
