import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/anime.model';
import { AnimeService } from 'src/app/services/anime.service';


@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss']
})
export class AnimesListComponent implements OnInit {

  animes?: Anime[];
  currentAnime: Anime = {};
  currentIndex = -1;
  title: string = '';

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.retrieveAnimes();
  }

  retrieveAnimes(): void {
    this.animeService.getAll()
      .subscribe(
        data => {
          this.animes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveAnimes();
    this.currentAnime = {};
    this.currentIndex = -1;
  }

  setActiveAnime(anime: Anime, index: number): void {
    this.currentAnime = anime;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentAnime = {};
    this.currentIndex = -1;

    this.animeService.findByTitle(this.title)
      .subscribe(
        data => {
          this.animes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
