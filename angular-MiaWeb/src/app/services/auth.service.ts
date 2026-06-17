import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.getAuthStatus());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<string | null>(this.getStoredUser());
  public currentUser$: Observable<string | null> = this.currentUserSubject.asObservable();

  private currentRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());
  public currentRole$: Observable<string | null> = this.currentRoleSubject.asObservable();

  private validUsers: User[] = [
    { 
      username: 'admin', 
      password: 'admin123',
      role: 'admin',
      permissions: ['view_archiv', 'edit_content', 'manage_users', 'view_admin']
    },
    { 
      username: 'mia', 
      password: 'passwort1',
      role: 'user',
      permissions: ['view_archiv', 'view_home']
    },
    { 
      username: 'guest1', 
      password: 'passwort1',
      role: 'guest',
      permissions: ['view_home']
    }
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.validUsers.find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      localStorage.setItem('authToken', 'token_' + Date.now());
      localStorage.setItem('currentUser', username);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userPermissions', JSON.stringify(user.permissions));
      
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(username);
      this.currentRoleSubject.next(user.role);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPermissions');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.currentRoleSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  hasPermission(permission: string): boolean {
    const perms = localStorage.getItem('userPermissions');
    if (!perms) return false;
    return JSON.parse(perms).includes(permission);
  }

  hasRole(role: string): boolean {
    return localStorage.getItem('userRole') === role;
  }

  private getAuthStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getStoredUser(): string | null {
    return localStorage.getItem('currentUser');
  }

  private getStoredRole(): string | null {
    return localStorage.getItem('userRole');
  }
}

