import { Component } from '@angular/core';
import { TrendingPhrasesComponent } from './trending-phrases/trending-phrases.component'; // Import here

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TrendingPhrasesComponent]  // Add TrendingPhrasesComponent here
})
export class AppComponent {
  title = 'trending-phrases-app';
}