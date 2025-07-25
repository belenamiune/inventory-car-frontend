import { Component } from '@angular/core';
import { selectTheme } from './store/ui/ui.selectors';
import { Store } from '@ngrx/store';

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
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);
    });
  }
}
