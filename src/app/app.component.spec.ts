import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectTheme } from '@store/theme';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectTheme, value: 'light' }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el título "challenge-project"', () => {
    expect(component.title).toBe('challenge-project');
  });

  it('debería agregar clase "dark" si el theme es "dark"', () => {
    store.overrideSelector(selectTheme, 'dark');
    store.refreshState();

    fixture.detectChanges();

    expect(document.documentElement.classList.contains('dark')).toBeTrue();
  });

  it('debería quitar clase "dark" si el theme es "light"', () => {
    store.overrideSelector(selectTheme, 'light');
    store.refreshState();

    fixture.detectChanges();

    expect(document.documentElement.classList.contains('dark')).toBeFalse();
  });
});
