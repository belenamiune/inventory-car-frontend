import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { register, selectAuthLoading, selectAuthError } from '@features/auth/store';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.registerForm.invalid).toBeTrue();
  });

  it('should NOT dispatch register if form is invalid', () => {
    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch register if form is valid', () => {
    component.registerForm.setValue({
      email: 'belu@test.com',
      password: '123456'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      register({
        credentials: {
          email: 'belu@test.com',
          password: '123456'
        }
      })
    );
  });

  it('should navigate to login page', () => {
    component.irALogin();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
  });

  it('should expose loading$ and error$', done => {
    component.loading$.subscribe(val => {
      expect(val).toBeFalse();
      done();
    });
  });
});
