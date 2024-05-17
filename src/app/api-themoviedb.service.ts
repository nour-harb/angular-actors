import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actor } from './models/actor';
import { Observable, map } from 'rxjs';
import { Film } from './models/film';

@Injectable({
  providedIn: 'root'
})
export class ApiThemoviedbService {

  private apiBaseUrl = 'https://api.themoviedb.org/3/';

  options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTFlZmRlOWQxZjFlNTRmNWZjNWIyYTFiM2RkMGUwMSIsInN1YiI6IjY2Mzg0YzU1Y2FhNTA4MDEyNmY1NzRhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59lOYhxr6LQN-kDGq3OqQVmEUvCtRfUHk2EZJ3icRLA'
    }
  };

  constructor(private httpClient: HttpClient) { }

  getActorMovies(actorId: number): Observable<Film[]> {
    let rawObservable: Observable<any>;
    let moviesObservable: Observable<Film[]>;
  
    let endpoint = 'person/'+actorId+'/movie_credits?language=en-US';  
  
    rawObservable = this.httpClient.get<any>(this.apiBaseUrl + endpoint,this.options);
    moviesObservable = rawObservable.pipe(
      map((data: any) => {
        const movies: Film[] = data.cast.map((movieData: any) => new Film(movieData));
        return movies;
      })
    );
  
    return moviesObservable;
  }

  searchActors(query: string): Observable<Actor[]> {
    let rawObservable: Observable<any>;
    let actorsObservable: Observable<Actor[]>;

    let endpoint = 'search/person?query='+query+'&include_adult=false&language=en-US&page=1'

    rawObservable = this.httpClient.get<any>(this.apiBaseUrl + endpoint,this.options);
    actorsObservable = rawObservable.pipe(
      map((data: any) => {
        const actors: Actor[] = data.results.map((actorData: any) => new Actor(actorData));
        const nearestActors: Actor[] = this.findNearestActors(actors, query);
        return nearestActors;
      })
    );

    return actorsObservable;
  }

  findNearestActors(actors: Actor[], query: string): Actor[] {
    const nearestActors: Actor[] = [];
  
    // Prefix matching (adjust prefixLength as needed)
    const prefixLength = 3;
    for (const actor of actors) {
      if (actor.name.toLowerCase().startsWith(query.toLowerCase().substring(0, prefixLength))) {
        nearestActors.push(actor);
      }
    }
  
    // Levenshtein distance calculation with adjustable threshold
    const maxDistance = 2;
    for (const actor of actors) {
      const distance = this.calculateLevenshteinDistance(actor.name.toLowerCase(), query.toLowerCase());
      if (distance <= maxDistance) {
        nearestActors.push(actor);
      }
    }
  
    return nearestActors;
  }
                      
                        
    

  calculateLevenshteinDistance(s1: string, s2: string): number {
    const len1 = s1.length;
    const len2 = s2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[len1][len2];
  }





}
