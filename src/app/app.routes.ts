import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'flash-cards',
    loadChildren: () => import('./features/flash-cards/flash-cards.routes')
      .then(m => m.FLASH_CARDS_ROUTES)
  },
  {
    path: 'favorite-phrases',
    loadChildren: () => import('./features/favorite-phrases/favorite-phrases.routes')
      .then(m => m.FAVORITE_PHRASES_ROUTES)
  },
  {
    path: 'trending-phrases',
    loadChildren: () => import('./features/trending-phrases/trending-phrases.routes')
      .then(m => m.TRENDING_PHRASES_ROUTES)
  },
  {
    path: 'learning-community',
    loadChildren: () => import('./features/learning-community/learning-community.routes')
      .then(m => m.LEARNING_COMMUNITY_ROUTES)
  },
  {
    path: '',
    redirectTo: 'flash-cards',
    pathMatch: 'full'
  }
]; 