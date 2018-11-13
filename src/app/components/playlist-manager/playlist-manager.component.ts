import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlist-manager',
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.css'],
})
export class PlaylistManagerComponent implements OnInit {
  playlist_name: string;
  playlists: Playlist[];
  player_playlist: string;

  constructor(private playlistService: PlaylistService) { }

  createPlaylist() {
    console.log(this.playlist_name);
    this.playlistService.createPlaylist(this.playlist_name)
      .subscribe(playlist => {
        console.log(playlist);
        this.getPlaylist();
      });
  }

  getPlaylist() {
    this.playlistService.getPlaylist()
      .subscribe(playlists => {
        console.log(playlists);
        this.playlists = playlists;
      });
  }

  deletePlaylist(id) {
    console.log(id);
    this.playlistService.deletePlaylist(id)
      .subscribe(res => {
        console.log(res);
        this.getPlaylist();
      });
  }

  listenToPlaylist(playlist) {
    delete this.player_playlist;
    this.player_playlist = playlist;
  }

  ngOnInit() {
    this.getPlaylist();
  }
}
