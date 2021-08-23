import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Anime } from '../../models/anime.model';
import { AnimeService } from '../../services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileDB } from '../../models/file-db.model';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {

  currentAnime: Anime = {
    title: '',
    genre: '',
    synopsis: '',
    aired: '',
    ended: '',
    rating: '',
    fileDB: []
  };

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  errorMsg = '';

  fileInfos?: Observable<any>;

  constructor(
    private animeService: AnimeService,
    private uploadService: FileUploadService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getAnime(this.route.snapshot.params.id);
  }

  getAnime(id: string): void {
    this.animeService.get(id).subscribe(
      (data) => {
        this.currentAnime = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        console.log(this.currentFile);
        console.log(this.currentAnime.id);

        this.uploadService
          .upload(this.currentFile, this.currentAnime.id)
          .subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = "L'image a bien été ajouter";
                this.fileInfos = this.uploadService.getFiles();
                console.log(this.fileInfos);
              }
            },
            (err: any) => {
              console.log(err);

              if (err.error && err.error.responseMessage) {
                this.errorMsg = err.error.responseMessage;
              } else {
                this.errorMsg = 'Error occurred while uploading a file!';
              }

              this.currentFile = undefined;
            }
          );
      }

      this.selectedFiles = undefined;
    }
  }
}
