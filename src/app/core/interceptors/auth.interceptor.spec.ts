import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should add Authorization header if token exists', done => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');

    const fakeRequest = new HttpRequest('GET', '/test');
    const fakeHandler: HttpHandler = {
      handle: req => {
        expect(req.headers.has('Authorization')).toBeTrue();
        expect(req.headers.get('Authorization')).toBe('Bearer fake-token');
        return of({} as any);
      }
    };

    interceptor.intercept(fakeRequest, fakeHandler).subscribe(() => {
      done();
    });
  });

  it('should NOT add Authorization header if token does not exist', done => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const fakeRequest = new HttpRequest('GET', '/test');
    const fakeHandler: HttpHandler = {
      handle: req => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return of({} as any);
      }
    };

    interceptor.intercept(fakeRequest, fakeHandler).subscribe(() => {
      done();
    });
  });
});
