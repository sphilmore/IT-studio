import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TrendingPhrase {
  id: number;
  phrase: string;
  translation: string;
  upvotes: number;
}

@Component({
  selector: 'app-trending-phrases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trending-phrases.component.html',
  styleUrls: ['./trending-phrases.component.css']
})
export class TrendingPhrasesComponent implements OnInit {
  trendingPhrases: TrendingPhrase[] = [];
  newPhrase: TrendingPhrase = {
    id: 0,
    phrase: '',
    translation: '',
    upvotes: 0
  };

  ngOnInit() {
    // Initialize with some example phrases
    this.trendingPhrases = [
      { id: 1, phrase: 'Hello World', translation: 'Hola Mundo', upvotes: 25 },
      { id: 2, phrase: 'Good Morning', translation: 'Buenos Días', upvotes: 18 },
      { id: 3, phrase: 'Thank You', translation: 'Gracias', upvotes: 15 }
    ];
  }

  addPhrase() {
    if (this.newPhrase.phrase && this.newPhrase.translation) {
      this.trendingPhrases.push({
        ...this.newPhrase,
        id: Date.now(),
        upvotes: 0
      });
      this.newPhrase = { id: 0, phrase: '', translation: '', upvotes: 0 };
    }
  }

  upvotePhrase(phrase: TrendingPhrase) {
    phrase.upvotes++;
    this.sortPhrases();
  }

  deletePhrase(id: number) {
    this.trendingPhrases = this.trendingPhrases.filter(phrase => phrase.id !== id);
  }

  private sortPhrases() {
    this.trendingPhrases.sort((a, b) => b.upvotes - a.upvotes);
  }
} 