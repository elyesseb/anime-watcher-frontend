import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/models/episode.model';
import { EpisodeService } from 'src/app/services/episode.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-episodes-list',
  templateUrl: './home-episodes-list.component.html',
  styleUrls: ['./home-episodes-list.component.scss'],
})
export class HomeEpisodesListComponent implements OnInit {
  episodes: Episode[] = [];

  content: any;
  constructor(
    private episodeService: EpisodeService,
    private userService: UserService,
    private route: ActivatedRoute
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

    this.getEpisodesList(this.route.snapshot.params.id);
  }

  getEpisodesList(id: any): void {
    this.episodeService.getAll(id).subscribe(
      (data) => {
        this.episodes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
