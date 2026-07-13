import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="welcome-page">
      <div class="card">
        <h1>Willkommen bei Mias Webseite</h1>
        <p>Hier finden sie die Themen übersicht</p>
        <nav class="button-row">
          <a routerLink="/aboutMe" class="button">About Me</a>
          <a routerLink="/home" class="button secondary">Home</a>
          <a routerLink="/archiv" class="button secondary">Archiv</a>
        </nav>
      </div>
    </main>
  `,
  styleUrls: ['./welcome.scss']
})
export class WelcomeComponent {}
