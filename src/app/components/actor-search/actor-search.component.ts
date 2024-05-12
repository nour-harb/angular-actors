import { Component } from '@angular/core';
import { Actor } from '../../models/actor';
import { ApiThemoviedbService } from '../../api-themoviedb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './actor-search.component.html',
  styleUrl: './actor-search.component.css'
})
export class ActorSearchComponent {

  query: string = '';
  searchResults: Actor[] = [];

  constructor(private apiService: ApiThemoviedbService) { }

  searchActors(): void {
    if (this.query.trim() !== '') {
      this.apiService.searchActors(this.query).subscribe(
        actors => {
          this.searchResults = actors.slice(0, 9);;
        },
        error => {
          console.error('Error fetching actors:', error);

        }
      );
    }
  }

  
}
