import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/anime.model';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-add-anime',
  templateUrl: './add-anime.component.html',
  styleUrls: ['./add-anime.component.scss'],
})
export class AddAnimeComponent implements OnInit {
  anime: Anime = {
    title: '',
    genre: '',
    synopsis: '',
    aired: '',
    ended: '',
    rating: '',
  };

  submitted = false;

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {}

  saveAnime(): void {
    const data = {
      title: this.anime.title,
      genre: this.anime.genre,
      synopsis: this.anime.synopsis,
      aired: this.anime.aired,
      ended: this.anime.ended,
      rating: this.anime.rating
    };

    this.animeService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newAnime(): void {
    this.submitted = false;
    this.anime = {
      title: '',
      genre: '',
      synopsis: '',
      aired: '',
      ended: '',
      rating: '',
    };
  }
}
