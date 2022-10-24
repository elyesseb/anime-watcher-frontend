import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.scss'],
})
export class AddEpisodeComponent implements OnInit {
  episode: Episode = {
    season: '',
    episodeNb: '',
    aired: '',
    anime_id: '',
  };

  submitted = false;

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {}

  saveEpisode(): void {
    const data = {
      season: this.episode.season,
      episodeNb: this.episode.episodeNb,
      aired: this.episode.aired,
      anime_id: this.episode.anime_id,
    };

    this.episodeService.add(this.episode.anime_id, data).subscribe(
      () => {
        this.submitted = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  newEpisode(): void {
    this.submitted = false;
    this.episode = {
      season: '',
      episodeNb: '',
      aired: '',
      anime_id: '',
    };
  }
}
