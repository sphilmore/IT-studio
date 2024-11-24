import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface WordDefinition {
  word: string;
  phonetic: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string | null;
    }[];
  }[];
}

interface TrendingPhrase {
  id: number;
  phrase: string;
  translation: string;
  upvotes: number;
  definition?: string;
  phonetic?: string;
  partOfSpeech?: string;
  example?: string;
}

interface PhraseResponse {
  word: string;
  definition: string;
  phonetic: string;
}

@Component({
  selector: 'app-trending-phrases',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule
  ],
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
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRandomWords();
  }

  fetchRandomWords() {
    this.loading = true;
    this.http.get<PhraseResponse[]>('http://localhost:3000/api/random-words')
      .subscribe({
        next: (phrases) => {
          this.trendingPhrases = phrases.map(phrase => ({
            id: Date.now() + Math.random(),
            phrase: phrase.word,
            translation: '', 
            upvotes: 0,
            definition: phrase.definition,
            phonetic: phrase.phonetic
          }));
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching random phrases:', error);
          this.loading = false;
        }
      });
  }

  async addPhrase() {
    if (this.newPhrase.phrase) {
      this.loading = true;
      try {
        // Fetch definition for the new phrase
        const response = await this.http.get<WordDefinition>(
          `http://localhost:3000/api/word/${this.newPhrase.phrase.toLowerCase()}`
        ).toPromise();

        if (response) {
          const firstMeaning = response.meanings[0];
          const firstDefinition = firstMeaning.definitions[0];

          this.trendingPhrases.unshift({
            ...this.newPhrase,
            id: Date.now(),
            upvotes: 0,
            definition: firstDefinition.definition,
            phonetic: response.phonetic,
            partOfSpeech: firstMeaning.partOfSpeech,
            example: firstDefinition.example || undefined
          });

          this.newPhrase = { id: 0, phrase: '', translation: '', upvotes: 0 };
        }
      } catch (error) {
        console.error('Error fetching word definition:', error);
      } finally {
        this.loading = false;
      }
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