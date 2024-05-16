import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actor } from '../../models/actor';

@Component({
  selector: 'app-favorite-actors',
  templateUrl: './favorite-actors.component.html',
  styleUrls: ['./favorite-actors.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FavoriteActorsComponent implements OnInit {
  favoriteActors: Actor[] = [];

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const favorites = localStorage.getItem('favoriteActors');
    if (favorites) {
      this.favoriteActors = JSON.parse(favorites);
    }
  }
}
