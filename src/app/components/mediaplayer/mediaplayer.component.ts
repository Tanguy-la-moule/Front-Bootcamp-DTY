import { Component, OnInit, Input } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Router } from '@angular/router';
import { OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Song } from '../../models/songs';

@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css'],
  providers: [SongService],
})

export class MediaplayerComponent implements OnInit {
  lectureNb: number;
  @Input() playlist: string;
  audio: Audio;
  song: Song;

  constructor(private songService: SongService, private router: Router) { }

  nextSong() {
    if (this.lectureNb  + 1 === this.playlist.split(' ').length) {
      this.lectureNb = 0;
    } else {
      this.lectureNb += 1;
    }
    this.songService.getSong(this.playlist.split(' ')[this.lectureNb])
      .subscribe( song => {
        this.song = song.song;
        this.audio.src = this.song.storage_url;
      });
  }

  previousSong() {
    if (this.lectureNb  - 1 === -1) {
      this.lectureNb = this.playlist.split(' ').length - 1;
    } else {
      this.lectureNb += -1;
    }
    this.songService.getSong(this.playlist.split(' ')[this.lectureNb])
      .subscribe( song => {
        this.song = song.song;
        this.audio.src = this.song.storage_url;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const playlist: SimpleChange = changes.playlist;
    console.log('prev value: ', playlist.previousValue);
    console.log('got playlist: ', playlist.currentValue);
    console.log(this.playlist);

    this.lectureNb = 0;

    this.songService.getSong(this.playlist.split(' ')[this.lectureNb])
      .subscribe( song => {
        this.song = song.song;
        this.audio.src = this.song.storage_url;
      });
}

  ngOnInit() {
    this.lectureNb = 0;
    this.audio = document.getElementById('audio');
    this.audio.addEventListener('ended', () => { this.nextSong(); });

    this.songService.getSong(this.playlist.split(' ')[this.lectureNb])
      .subscribe( song => {
        this.song = song.song;
        this.audio.src = this.song.storage_url;
      });
  }
}
