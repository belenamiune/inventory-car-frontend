import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { login, selectAuthError, selectAuthLoading } from '@features/auth/store';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAuthLoading, value: false },
            { selector: selectAuthError, value: null }
          ]
        }),
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should not dispatch login if form is invalid', () => {
    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch login if form is valid', () => {
    component.loginForm.setValue({
      email: 'belu@test.com',
      password: '123456'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      login({
        credentials: {
          email: 'belu@test.com',
          password: '123456'
        }
      })
    );
  });

  it('should navigate to register page', () => {
    component.irARegistro();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/register']);
  });

  it('should expose loading$ and error$', (done) => {
    component.loading$.subscribe(val => {
      expect(val).toBe(false);
      done();
    });
  });
});
