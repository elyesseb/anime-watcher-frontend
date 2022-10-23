import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

const AUTH_API = 'https://snk-api.azurewebsites.net/api/auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user result', () => {
    const data = [
      {
        username: 'Toto',
        email: 'toto@gmail.com',
        password: '12345678',
      },
    ];

    service
      .register(data[0].username, data[0].email, data[0].password)
      .subscribe((data) => {
        expect(data).toBeTruthy();
        expect(data.length).toBe(1);
      });

    const req = httpMock.expectOne(`${AUTH_API}/signup`);
    expect(req.request.method).toBe('POST');
    req.flush(data);
  });
});
