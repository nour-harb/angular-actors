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

 

  getPopularityStars(popularity: number): number[] {
    const maxStars = 5;
  
    // Calculate filled stars considering decimals (more accurate)
    const filledStars = Math.max(0, Math.floor(popularity * 0.5)); 
    const partialStar = popularity % 1 !== 0 ? 1 : 0;
  
    // Calculate empty stars considering decimals
    let emptyStars = maxStars - (filledStars + partialStar);
  
    // Handle edge cases (popularity very close to a whole number)
    if (Math.abs(emptyStars) < 0.001) {
      emptyStars = 0; // Set empty stars to 0 if very close to 0
    }
  
    return Array(filledStars).fill(1).concat(partialStar ? 0.5 : 0).concat(Array(emptyStars).fill(0.1));
  }
                    
                      
                      
                      
                      
                      
  

}



