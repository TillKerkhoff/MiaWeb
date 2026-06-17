import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="app-shell">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .app-shell {
      }
      h1 {
        font-size: clamp(2rem, 4vw, 2.75rem);
      }
    `
  ]
})
export class App {
  protected readonly title = signal('angular-MiaWeb');
}
