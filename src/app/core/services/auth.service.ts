import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'password123', role: 'user' }
  ];
  // private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    this.router.navigate(['/login']);

  }

  getCurrentUser() {
    if (!this.currentUserSubject.value) {
      const user = localStorage.getItem('currentUser');
      if (user) this.currentUserSubject.next(JSON.parse(user));
    }
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }

  // Get the role of the current user
  getUserRole() {
    const user = localStorage.getItem('currentUser');
    if (!user) return null;
    return JSON.parse(user).role;   // user | admin
  }



}
