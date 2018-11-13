import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SongService } from '../../services/song.service';
import { Song } from '../../models/songs';

// import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css'],
  providers: [SongService],
})
export class AddSongComponent implements OnInit {
  title: string;
  artist: string;
  album: string;
  uploader_id: string;
  storage_url: string;
  cover_url: string;
  songs: Song[];
  coverFileName: string;
  songFileName: string;

  // declare a property called fileuploader and assign it to an instance of a new fileUploader.
  // pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  // define the constant url we would be uploading to.
  public photoURL = 'http://localhost:8000/upload/photo';
  public songURL = 'http://localhost:8000/upload/song';

  public coverUploader: FileUploader = new FileUploader({url: this.photoURL, itemAlias: 'photo'});
  public songUploader: FileUploader = new FileUploader({url: this.songURL, itemAlias: 'mp3song'});

  constructor(private songService: SongService, private router: Router) { }

  addSong(title, artist, album, cover_url, storage_url) {
    const uploader_id = localStorage.getItem('USER_ID');
    console.log(storage_url);
    console.log(cover_url);
    this.songService.addSong(title, artist, album, uploader_id, storage_url, cover_url)
      .subscribe(res => {
        console.log(res);
        this.songService.getSongs(localStorage.getItem('USER_ID'))
            .subscribe( songs => {
              this.songs = songs;
              console.log(this.songs);
            });
      });
  }

  playAudio(storage_url) {
    const audio = new Audio(storage_url);

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(function () {
            console.log('Playing....');
        }).catch(function (error) {
            console.log('Failed to play....' + error);
        });
      }
    }


  showCoverName () {
    const name = document.getElementById('fileInputCover');
    this.coverFileName = name.files.item(0).name;
  }

  showSongName () {
    const name = document.getElementById('fileInputSong');
    this.songFileName = name.files.item(0).name;
  }

  ngOnInit() {
    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.coverUploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.coverUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.cover_url = 'http://localhost:8000/' + response;
      console.log('you uploaded a picture @ ');
      console.log(this.cover_url);
    };

    // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.songUploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.songUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.storage_url = 'http://localhost:8000/' + response;
      console.log('you uploaded a mp3 song @ ');
      console.log(this.storage_url);
    };

    this.songService.getSongs(localStorage.getItem('USER_ID'))
        .subscribe( songs => {
          this.songs = songs;
          console.log(this.songs);
        });
      }
}
