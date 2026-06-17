import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="welcome-page">
      <a routerLink="/anmeldung" class="login-icon" title="Anmelden">🔒</a>
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
  styles: [
    `
      .welcome-page {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('./Hintergrund.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
      .card {
        max-width: 540px;
        width: 100%;
        border-radius: 1.25rem;
        padding: 2rem;
        box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
        background: white;
        text-align: center;
      }
      h1 {
        margin: 0 0 1rem;
        font-size: clamp(2rem, 4vw, 3rem);
        color: #102a43;
      }
      p {
        margin: 0 0 1.75rem;
        color: #334e68;
        line-height: 1.7;
      }
      .button-row {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .login-icon {
        position: absolute;
        top: 1rem;
        left: 1rem;
        font-size: 1.5rem;
        text-decoration: none;
        background: rgba(255,255,255,0.85);
        padding: 0.4rem 0.6rem;
        border-radius: 0.5rem;
        box-shadow: 0 6px 18px rgba(2,6,23,0.2);
        color: #0f172a;
      }
      .login-icon:hover { transform: translateY(-2px); }
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.9rem 1.4rem;
        border-radius: 999px;
        text-decoration: none;
        color: white;
        background: #0f62fe;
        font-weight: 600;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .button:hover {
        transform: translateY(-1px);
        background: #0353e9;
      }
      .button.secondary {
        background: #334e68;
      }
      .button.secondary:hover {
        background: #243b53;
      }
    `
  ]
})
export class WelcomeComponent {}
