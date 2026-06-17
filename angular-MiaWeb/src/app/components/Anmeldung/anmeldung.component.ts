import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-anmeldung',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="anmeldung-container">
      <div class="login-card">
        <h1>Anmelden</h1>
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="username">Benutzername</label>
            <input id="username" name="username" [(ngModel)]="username" required />
          </div>
          <div class="form-group">
            <label for="password">Passwort</label>
            <input id="password" name="password" type="password" [(ngModel)]="password" required />
          </div>
          <div *ngIf="loginError" class="error">{{ loginError }}</div>
          <button class="login-btn" type="submit">Anmelden</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .anmeldung-container { min-height: 100vh; display:flex; align-items:center; justify-content:center; padding:2rem; background: linear-gradient(135deg,#f3f7ff 0%, #ffffff 100%);} 
    .login-card { background:white; padding:2rem; border-radius:0.75rem; box-shadow:0 12px 40px rgba(2,6,23,0.08); width:360px; }
    .login-card h1 { margin:0 0 1rem 0; }
    .form-group { margin-bottom:1rem; }
    .form-group input { width:100%; padding:0.6rem; border:1px solid #ddd; border-radius:0.5rem }
    .login-btn { width:100%; padding:0.6rem; background:#0f62fe; color:white; border:none; border-radius:0.5rem }
    .error { color:#c33; margin-bottom:0.75rem }
  `]
})
export class AnmeldungComponent implements OnInit {
  username = '';
  password = '';
  loginError = '';
  returnUrl: string | null = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  onLogin(): void {
    this.loginError = '';
    if (!this.username.trim() || !this.password.trim()) {
      this.loginError = 'Benutzername und Passwort sind erforderlich.';
      return;
    }

    const ok = this.authService.login(this.username, this.password);
    if (!ok) {
      this.loginError = 'Anmeldung fehlgeschlagen.';
      return;
    }

    // navigate to returnUrl or archiv
    const target = this.returnUrl || '/archiv';
    this.router.navigateByUrl(target);
  }
}