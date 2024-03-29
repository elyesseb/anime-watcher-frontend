import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAnimeComponent } from './components/add-anime/add-anime.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimesListComponent } from './components/animes-list/animes-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { authInterceptorProviders } from './interceptors/auth.interceptor';

import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeDetailsComponent } from './components/home-details/home-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CguComponent } from './components/cgu/cgu.component';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { HomeEpisodesListComponent } from './components/home-episodes-list/home-episodes-list';
import { HomeEpisodeDetailsComponent } from './components/home-episode-details/home-episode-details.component';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAnimeComponent,
    AnimesListComponent,
    AnimeDetailsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    UploadImagesComponent,
    PageNotFoundComponent,
    FooterComponent,
    HomeDetailsComponent,
    CguComponent,
    HomeEpisodesListComponent,
    HomeEpisodeDetailsComponent,
    AddEpisodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NoopAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],

  providers: [
    authInterceptorProviders,
    [
      {
        provide: RECAPTCHA_SETTINGS,
        useValue: {
          siteKey: environment.recaptcha.siteKey,
        } as RecaptchaSettings,
      },
    ],
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
