import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { HttpTokenInterceptor } from './http-token.interceptor';
import { TokenService } from '../token/token.service';

describe('HttpTokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    tokenServiceSpy = jasmine.createSpyObj('TokenService', ['token'], { token: 'fake-jwt-token' });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: TokenService, useValue: tokenServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpTokenInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header when token exists', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-jwt-token');
  });

  it('should not add Authorization header when token is null', () => {
    tokenServiceSpy.token = null!;
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });
});
