import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnimeComponent } from './components/add-anime/add-anime.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { AnimesListComponent } from './components/animes-list/animes-list.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
// import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
// import { BoardUserComponent } from './components/board-user/board-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { HomeDetailsComponent } from './components/home-details/home-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', canActivate : [AuthGuard] , children : [
  { path: 'profile', component: ProfileComponent }
  // { path: 'user', component: BoardUserComponent },
  ]},
  // { path: 'mod', component: BoardModeratorComponent }
  { path: '', canActivate : [AdminGuard] , children : [
  { path: 'admin', component: BoardAdminComponent},
  { path: 'animes', component: AnimesListComponent },
  { path: 'animes/:id', component: AnimeDetailsComponent },
  { path: 'add', component: AddAnimeComponent },
  { path: 'images/:id', component: UploadImagesComponent },
  { path: 'animes-details', component: AnimeDetailsComponent}
  ]},
  {path: 'notfound', component: PageNotFoundComponent},
  { path:'**', redirectTo:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
