import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <header class="bg-primary p-4">
      <nav class="container">
        <ul class="flex gap-4 text-white">
          <li><a routerLink="/flash-cards" routerLinkActive="font-bold">Flash Cards</a></li>
          <li><a routerLink="/favorite-phrases" routerLinkActive="font-bold">Favorite Phrases</a></li>
          <li><a routerLink="/trending-phrases" routerLinkActive="font-bold">Trending Phrases</a></li>
          <li><a routerLink="/learning-community" routerLinkActive="font-bold">Learning Community</a></li>
        </ul>
      </nav>
    </header>

    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'IT Studio';
} 