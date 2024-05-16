import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/actor';
import { ApiThemoviedbService } from '../../api-themoviedb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  favoriteActorIds: number[] = [];

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


  toggleFavorite(actorId: number): void {
    const index = this.favoriteActorIds.indexOf(actorId);
    if (index > -1) {
      this.favoriteActorIds.splice(index, 1); // Remove from favorites
    } else {
      this.favoriteActorIds.push(actorId); // Add to favorites
    }
    this.saveFavorites();
  }
  
  

  isFavorite(actorId: number): boolean {
    return this.favoriteActorIds.includes(actorId);
  }

  private loadFavorites(): void {
    const favorites = localStorage.getItem('favoriteActors');
    if (favorites) {
      this.favoriteActorIds = JSON.parse(favorites);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favoriteActors', JSON.stringify(this.favoriteActorIds));
  }

  navigateToFavorites() {
    this.router.navigate(['/favorite-actors']);
  }
}
