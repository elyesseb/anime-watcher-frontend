import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/app/models/anime.model';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss']
})
export class HomeDetailsComponent implements OnInit {

  currentAnime: Anime = {
    title: '',
    genre: '',
    synopsis: '',
    aired: '',
    ended: '',
    rating: ''
  };

  constructor(private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getAnime(this.route.snapshot.params.id);
  }

  getAnime(id: string): void {
    this.animeService.get(id)
      .subscribe(
        data => {
          this.currentAnime = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
