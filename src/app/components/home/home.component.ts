import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/anime.model';
import { AnimeService } from 'src/app/services/anime.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  content?: string;
  animes?: Anime[];
  currentAnime: Anime = {};
  currentIndex = -1;
  title: string = '';
  fileDB?: any;

  constructor(
    private userService: UserService,
    private animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.retrieveAnimes();
  }

  retrieveAnimes(): void {
    this.animeService.getAll().subscribe(
      (data) => {
        this.animes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.currentAnime = {};
    this.currentIndex = -1;

    this.animeService.findByTitle(this.title).subscribe(
      (data) => {
        this.animes = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
