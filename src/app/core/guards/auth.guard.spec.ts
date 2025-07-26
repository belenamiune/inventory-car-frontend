import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { selectAuthToken } from '@features/auth/store/auth.selector';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore(),
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if token exists in store', (done) => {
    store.overrideSelector(selectAuthToken, '1234');

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should return true if token exists in localStorage', (done) => {
    store.overrideSelector(selectAuthToken, null);
    spyOn(localStorage, 'getItem').and.returnValue('abcd');

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should return false and navigate to login if no token', (done) => {
    store.overrideSelector(selectAuthToken, null);
    spyOn(localStorage, 'getItem').and.returnValue(null);

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
      done();
    });
  });
});
