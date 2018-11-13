import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/songs';

@Component({
  selector: 'app-choose-song',
  templateUrl: './choose-song.component.html',
  styleUrls: ['./choose-song.component.css'],
  providers: [SongService, PlaylistService],
})
export class ChooseSongComponent implements OnInit {
  @Input() playlist_songs: string;
  @Input() playlistID: string;
  addable_songs_array: Song[];
  playlist_songs_array: Song[];
  @Output() modified: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() listen: EventEmitter<any> = new EventEmitter();
  modify_state: boolean;

  constructor(private playlistService: PlaylistService, private songService: SongService) { }

  addSongToPlaylist(playlistID, songID) {
    console.log(playlistID);
    console.log(songID);
    this.playlistService.addSongToPlaylist(playlistID, songID)
      .subscribe(res => {
        this.playlist_songs = this.playlist_songs + ' ' + songID;
        this.getSongs();
        console.log(res);
        this.modified.emit(null);
      });
  }

  getSongs() {
    this.songService.getSongs(localStorage.getItem('USER_ID'))
        .subscribe( songs => {
          const songList = this.playlist_songs.split(' ');
          const selectedSongs = [];
          const playlistSongs = [];
          songs.forEach(function(song) {
            if (songList.indexOf(song._id) === -1) {
              selectedSongs.push({
                '_id': song._id,
                'title': song.title,
                'artist': song.artist,
                'cover_url': song.cover_url,
              });
            } else {
              playlistSongs.push({
                '_id': song._id,
                'title': song.title,
                'artist': song.artist,
                'cover_url': song.cover_url,
              });
            }
          });
          console.log(selectedSongs);
          console.log(playlistSongs);
          this.addable_songs_array = selectedSongs;
          this.playlist_songs_array = playlistSongs;
        });
      }


  ngOnInit() {
    this.modify_state = false;
    this.getSongs();
  }

}
