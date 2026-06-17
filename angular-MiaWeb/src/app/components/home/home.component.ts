import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Home</h1>
      <p>Willkommen auf meiner Homepage!</p>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
    }
  `]
})
export class HomeComponent {}