import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/anime.model';
import { AnimeService } from 'src/app/services/anime.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  content?: string;
  animes: Anime[] = [];
  currentAnime: Anime = {};
  currentIndex = -1;
  title: string = '';
  fileDB?: any;

  page = 1;
  count = 0;
  pageSize = 30;

  constructor(
    private userService: UserService,
    private animeService: AnimeService,
    private spinner: NgxSpinnerService
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

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 1500);

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

    this.animeService.getAll(params).subscribe(
      response => {
        this.animes = response;
        for (let i = 0; i < this.animes.length; i++) {
          this.animes[i].genre = this.animes[i].genre?.replace(/[^a-zA-Z ]/g, "");
          this.animes[i].title = this.animes[i].title?.replace(/[^a-zA-Z ]/g, "");
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.currentAnime = {};
    this.currentIndex = -1;
    this.page = 1;

    this.animeService.findByTitle(this.title).subscribe(
      (data) => {
        this.animes = data;
        for (let i = 0; i < this.animes.length; i++) {
          this.animes[i].genre = this.animes[i].genre?.replace(/[^a-zA-Z ]/g, "");
          this.animes[i].title = this.animes[i].title?.replace(/[^a-zA-Z^0-9 ]/g, "");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    window.scroll(0,0);
    this.retrieveAnimes();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAnimes();
  }

}
