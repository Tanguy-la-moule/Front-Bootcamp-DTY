import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, ApplicationRef, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { MediaplayerComponent } from './components/mediaplayer/mediaplayer.component';
import { AddfriendComponent } from './components/addfriend/addfriend.component';
import { PlaylistManagerComponent } from './components/playlist-manager/playlist-manager.component';

import { AuthentificationGuard } from './Authentification/AuthentificationGuard';
import { AuthErrorHandler } from './Authentification/AuthErrorHandler';

import { RouterModule, Routes } from '@angular/router';
import { ChooseSongComponent } from './components/choose-song/choose-song.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'addSong', component: AddSongComponent},
//  { path: 'addSong', component: AddSongComponent, canActivate: [AuthentificationGuard] },
  { path: 'mediaplayer', component: MediaplayerComponent},
//  { path: 'mediaplayer', component: MediaplayerComponent, canActivate: [AuthentificationGuard] },
  { path: 'addFriend', component: AddfriendComponent},
  { path: 'playlists', component: PlaylistManagerComponent},
  { path: 'chooseSong', component: ChooseSongComponent},
];

// { path: 'addFriend', component: AddfriendComponent, canActivate: [AuthentificationGuard]}
// importer le fichier dans providers
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddSongComponent,
    FileSelectDirective,
    MediaplayerComponent,
    AddfriendComponent,
    PlaylistManagerComponent,
    ChooseSongComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthentificationGuard,
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
