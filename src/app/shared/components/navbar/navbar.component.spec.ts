import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { logout } from '@features/auth/store';
import { toggleTheme, selectTheme } from '@store/theme';
import { ToggleButtonModule } from 'primeng/togglebutton';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [ToggleButtonModule],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectTheme,
              value: 'light'
            }
          ]
        }),
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logout and navigate to login', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.logout();
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should dispatch toggleTheme', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.toggleTheme();
    expect(dispatchSpy).toHaveBeenCalledWith(toggleTheme());
  });

  it('should select theme from store', done => {
    component.theme$.subscribe(value => {
      expect(value).toBe('light');
      done();
    });
  });
});
