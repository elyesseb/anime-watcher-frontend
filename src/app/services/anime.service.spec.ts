import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AnimeService } from './anime.service';
const baseUrl = 'https://snk-api.azurewebsites.net/anime';
describe('AnimeService', () => {
  let service: AnimeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AnimeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  it('should return a anime result', () => {
    // data
    const result = [
      {
        id: 8916,
        title: 'Naruto',
        genre: 'Fantastique',
        synopsis: 'Synopsis...',
        aired: '2007-02-15',
        ended: '2017-03-23',
        rating: 8.2,
      },
    ];

    // promise with some spec
    service.get(8916).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res[0].title).toBe('Naruto');
      expect(res.length).toBe(1);
    });

    // Mock data to this fake api uri
    const req = httpMock.expectOne(`${baseUrl}/getAnimeById/8916`);
    //Be sure to have GET request method
    expect(req.request.method).toBe('GET');
    req.flush(result);
  });

  it('should', () => {
    const data = [
      {
        id: 8916,
        title: 'Naruto',
        genre: 'Fantastique',
        synopsis: 'Synopsis...',
        aired: '2007-02-15',
        ended: '2017-03-23',
        rating: 8.2,
      },
    ];

    service.create(data).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(1);
    });

    // Mock data to this fake api uri
    const req = httpMock.expectOne(`${baseUrl}/add`);
    //Be sure to have POST request method
    expect(req.request.method).toBe('POST');
    req.flush(data);
  });
});
