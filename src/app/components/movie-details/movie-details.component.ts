import { Component } from '@angular/core';
import { Film } from '../../models/film';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie: Film | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['movie']) {
      try {
        this.movie = JSON.parse(queryParams['movie']); // Parse back the JSON string
      } catch (error) {
        console.error('Error parsing movie data:', error);
       
      }
    }
  }

 

  calculatePopularityStars(popularity: number): number[] {
    const maxStars = 5;
    const scaledPopularity = (popularity / 100) * maxStars;
    const roundedPopularity = Math.round(scaledPopularity);
    return new Array(roundedPopularity).fill(0);
  }
                    
                      
                      
                      
                      
                      
  

}



