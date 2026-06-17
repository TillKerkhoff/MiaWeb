import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-archiv',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="archiv-container">
      <div *ngIf="!(isAuthenticated$ | async)" class="login-section">
        <div class="login-card">
          <h1>Anmeldung erforderlich</h1>
          <p>Bitte melden Sie sich an, um auf das Archiv zuzugreifen.</p>
          
          <form (ngSubmit)="onLogin()">
            <div class="form-group">
              <label for="username">Benutzername</label>
              <input 
                id="username"
                type="text" 
                [(ngModel)]="username" 
                name="username"
                placeholder="Benutzername eingeben"
                required
              />
            </div>

            <div class="form-group">
              <label for="password">Passwort</label>
              <input 
                id="password"
                type="password" 
                [(ngModel)]="password" 
                name="password"
                placeholder="Passwort eingeben"
                required
              />
            </div>

            <div *ngIf="loginError" class="error-message">
              {{ loginError }}
            </div>

            <button type="submit" class="login-btn">Anmelden</button>
          </form>
        </div>
      </div>

      <div *ngIf="isAuthenticated$ | async" class="content-section">
        <div class="header">
          <h1>Archiv</h1>
          <button (click)="onLogout()" class="logout-btn">Abmelden</button>
        </div>
        <p>Willkommen im Archiv! Hier kommt dein Inhalt hin...</p>
      </div>
    </div>
  `,
  styles: [`
    .archiv-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      background: white;
      border-radius: 1rem;
      padding: 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      width: 100%;
    }

    .login-card h1 {
      margin-top: 0;
      color: #333;
      text-align: center;
    }

    .login-card p {
      color: #666;
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .error-message {
      background: #fee;
      color: #c33;
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      border-left: 4px solid #c33;
    }

    .login-btn {
      width: 100%;
      padding: 0.75rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .login-btn:hover {
      background: #5568d3;
    }

    .login-btn:active {
      transform: translateY(1px);
    }

    .content-section {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      max-width: 800px;
      width: 100%;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      margin: 0;
      color: #333;
    }

    .logout-btn {
      padding: 0.5rem 1.5rem;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s;
    }

    .logout-btn:hover {
      background: #da190b;
    }

    .content-section p {
      color: #666;
    }
  `]
})
export class ArchivComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginError: string = '';
  isAuthenticated$;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {}

  onLogin(): void {
    this.loginError = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.loginError = 'Benutzername und Passwort sind erforderlich.';
      return;
    }

    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.loginError = 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      return;
    }

    this.username = '';
    this.password = '';
  }

  onLogout(): void {
    this.authService.logout();
  }
}
