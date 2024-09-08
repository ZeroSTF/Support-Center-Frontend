import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/User.types';
import { Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _httpClient = inject(HttpClient);
  private _user: ReplaySubject<any> = new ReplaySubject<User>(1);
  private baseUrl = 'http://localhost:8080/auth/';

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current signed-in user data
   */
  get(): Observable<any> {
    // return new Observable<User>((observer) => {
    //   observer.next({
    //     id: 2,
    //     name: 'rostom',
    //     email: 'rostom@esprit.tn',
    //     role: 'user',
    //   });
    //   this._user.next({
    //     id: 2,
    //     name: 'rostom',
    //     email: 'rostom@esprit.tn',
    //     role: 'user',
    //   });
    // });
    return this._httpClient.get(this.baseUrl + 'current').pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }
}
