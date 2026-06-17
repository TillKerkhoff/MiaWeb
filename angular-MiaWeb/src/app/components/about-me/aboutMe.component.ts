import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  template: `
    <div class="about-container">
      <h1>About Me</h1>
      <p>Hier kommt dein Inhalt hin...</p>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 2rem;
    }
  `]
})
export class aboutMeComponent {}