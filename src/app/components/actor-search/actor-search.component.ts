import { Component, OnInit } from '@angular/core';
import { ApiThemoviedbService } from '../../api-themoviedb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Actor } from '../../models/actor';

@Component({
  selector: 'app-actor-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actor-search.component.html',
  styleUrls: ['./actor-search.component.css']
})
export class ActorSearchComponent implements OnInit {
  query: string = '';
  searchResults: Actor[] = [];
  favoriteActorIds: Actor[] = [];

  constructor(private apiService: ApiThemoviedbService, private router: Router) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  searchActors(): void {
    if (this.query.trim() !== '') {
      this.apiService.searchActors(this.query).subscribe(
        actors => {
          this.searchResults = actors.slice(0, 9);
        },
        error => {
          console.error('Error fetching actors:', error);
        }
      );
    }
  }


  toggleFavorite(actor: Actor): void {
    const index = this.favoriteActorIds.findIndex(favActor => favActor.id === actor.id);
    if (index > -1) {
      this.favoriteActorIds.splice(index, 1); // Remove from favorites
    } else {
      this.favoriteActorIds.push(actor); // Add entire actor object to favorites
    }
    this.saveFavorites();
  }
  
  

  isFavorite(actor: Actor): boolean {
    return this.favoriteActorIds.findIndex(favActor => favActor === actor) > -1;
  }
  
  

  private loadFavorites(): void {
    const favorites = localStorage.getItem('favoriteActors');
    if (favorites) {
      const serializedActors = JSON.parse(favorites) as string[]; // Parse to string[]
      this.favoriteActorIds = serializedActors.map(serializedActor => JSON.parse(serializedActor) as Actor); // Parse each string back to Actor
    }
  }
  
  
  private saveFavorites(): void {
    const serializedActors = this.favoriteActorIds.map(actor => JSON.stringify(actor)); // Stringify each Actor object
    localStorage.setItem('favoriteActors', JSON.stringify(serializedActors));
  }
  
  

  navigateToFavorites() {
    this.router.navigate(['/favorite-actors']);
  }
}
