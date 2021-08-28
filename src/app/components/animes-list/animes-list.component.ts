import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/anime.model';
import { AnimeService } from 'src/app/services/anime.service';


@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss']
})
export class AnimesListComponent implements OnInit {

  animes: Anime[] = [];
  currentAnime: Anime = {};
  currentIndex = -1;
  title: string = '';

  page = 1;
  count = 0;
  pageSize = 30;

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.retrieveAnimes();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveAnimes(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.animeService.getAll(params)
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

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAnimes();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAnimes();
  }
}
