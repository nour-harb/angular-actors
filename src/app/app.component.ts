import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActorSearchComponent } from './components/actor-search/actor-search.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ApiThemoviedbService } from './api-themoviedb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ActorSearchComponent,HttpClientModule,HttpClientXsrfModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiThemoviedbService]
})
export class AppComponent {
  title = 'angular-actors';
  constructor(private apiService: ApiThemoviedbService) { }

  
}
