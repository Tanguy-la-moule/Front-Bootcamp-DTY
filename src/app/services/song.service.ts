import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SongService {
  constructor(private http: Http) { }

  addSong(title, artist, album, uploader_id, storage_url, cover_url) {
    const newSong = {
      'title': title,
      'artist': artist,
      'album': album,
      'uploader_id': uploader_id,
      'storage_url': storage_url,
      'cover_url': cover_url,
    };
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN'), 'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8000/songs/song', newSong, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getSongs(id) {
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.get('http://localhost:8000/songs/allsongs/' + id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getSong(id) {
    const headers = new Headers({'Authorization': 'Token ' + localStorage.getItem('USER_TOKEN')});
    return this.http.get('http://localhost:8000/songs/song/' + id, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
