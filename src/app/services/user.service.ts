import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../models/user';
import { createUser } from '../models/createUser';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    private heroesUrl = 'https://localhost:7220/api/Users';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    /** GET heroes from the server */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.heroesUrl)
        .pipe(
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<User[]>('getUsers', []))
        );
    }

    public async getUserAsync() {
      const result = this.http.get<User[]>(this.heroesUrl);

      return new Promise<User[]>((resolve, reject) => {
        result.subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
    }

    /** POST: add a new user to the database */
    addUser(hero: createUser): Observable<createUser> {
      return this.http.post<createUser>(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          catchError(this.handleError('addUser', hero))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {    
        // TODO: send the error to remote logging infrastructure
        console.log(error); // log to console instead    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      console.log(message);
    }
}