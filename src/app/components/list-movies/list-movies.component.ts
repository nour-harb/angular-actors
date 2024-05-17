import { Component } from '@angular/core';
import { Actor } from '../../models/actor';
import { Film } from '../../models/film';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiThemoviedbService } from '../../api-themoviedb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css'
})
export class ListMoviesComponent {

  actorId: number | null = null;
  movies: Film[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  selectedMovie: Film | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiThemoviedbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.actorId = parseInt(this.route.snapshot.paramMap.get('id')!, 10); 
    if (this.actorId) {
      this.fetchActorMovies();
    }
  }

  fetchActorMovies() {
    this.apiService.getActorMovies(this.actorId!) 
      .subscribe(allMovies => {
        this.movies = allMovies.filter((movie, index) =>
          index >= (this.currentPage - 1) * 9 && index < this.currentPage * 9
        );
        this.totalPages = Math.ceil(allMovies.length / 9); 
      });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchActorMovies(); 
  }

  onMovieClick(movie: Film) {
    this.router.navigate(['/movie-details'], { queryParams: { movie: JSON.stringify(movie) } });
  }


  
}
