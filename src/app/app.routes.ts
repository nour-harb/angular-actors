import { Routes } from '@angular/router';
import { FavoriteActorsComponent } from './components/favorite-actors/favorite-actors.component';
import { ActorSearchComponent } from './components/actor-search/actor-search.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [ 
    { path: 'search-actors', component: ActorSearchComponent },
    { path: 'favorite-actors', component: FavoriteActorsComponent },
    {path: 'list-movies/:id',component: ListMoviesComponent },
    { path: 'movie-details', component: MovieDetailsComponent },
    { path: '', redirectTo: '/search-actors', pathMatch: 'full' } ];
