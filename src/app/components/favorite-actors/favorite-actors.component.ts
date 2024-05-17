import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actor } from '../../models/actor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-actors',
  templateUrl: './favorite-actors.component.html',
  styleUrls: ['./favorite-actors.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FavoriteActorsComponent implements OnInit {
  favoriteActors: Actor[] = [];
  currentPage: number = 0; 
totalPages: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const favorites = localStorage.getItem('favoriteActors');
    if (favorites) {
      const serializedActors = JSON.parse(favorites) as string[]; // Parse to string[]
      this.favoriteActors = serializedActors.map(serializedActor => JSON.parse(serializedActor) as Actor); // Parse each string back to Actor
    this.totalPages = Math.ceil(this.favoriteActors.length /9);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }
  
  onActorSelected(actor: Actor) {
    this.router.navigate(['/list-movies', actor.id]);
  }

  navigateToSearch() {
    this.router.navigate(['/search-actors']);
  }
  
}
