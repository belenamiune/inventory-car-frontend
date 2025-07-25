import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTheme } from '@store/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge-project';

  constructor(private store: Store) {}

  ngOnInit() {
  this.store.select(selectTheme).subscribe(theme => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })}
}
