import { Routes } from '@angular/router';
import { FavoriteActorsComponent } from './components/favorite-actors/favorite-actors.component';
import { ActorSearchComponent } from './components/actor-search/actor-search.component';

export const routes: Routes = [ 
    { path: 'search-actors', component: ActorSearchComponent },
    { path: 'favorite-actors', component: FavoriteActorsComponent }, // Check this line
    { path: '', redirectTo: '/search-actors', pathMatch: 'full' } ];
