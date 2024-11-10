import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Flashcard {
  id: number;
  term: string;
  definition: string;
  example: string;
}

@Component({
  selector: 'app-flash-cards',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flash-cards.component.html',
  styleUrls: ['./flash-cards.component.css']
})
export class FlashCardsComponent {
  flashcards: Flashcard[] = [];
  newFlashcard: Flashcard = { id: 0, term: '', definition: '', example: '' };
  editingFlashcard: Flashcard | null = null;

  addFlashcard() {
    if (this.newFlashcard.term && this.newFlashcard.definition) {
      this.flashcards.push({
        ...this.newFlashcard,
        id: Date.now()
      });
      this.newFlashcard = { id: 0, term: '', definition: '', example: '' };
    }
  }

  startEdit(flashcard: Flashcard) {
    this.editingFlashcard = { ...flashcard };
  }

  saveEdit() {
    if (this.editingFlashcard) {
      const index = this.flashcards.findIndex(f => f.id === this.editingFlashcard!.id);
      if (index !== -1) {
        this.flashcards[index] = { ...this.editingFlashcard };
      }
      this.editingFlashcard = null;
    }
  }

  cancelEdit() {
    this.editingFlashcard = null;
  }

  deleteFlashcard(id: number) {
    this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== id);
  }
} 