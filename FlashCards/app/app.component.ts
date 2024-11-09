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
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
  
})
export class AppComponent {
  flashcards: Flashcard[] = []; 
  newFlashcard: Flashcard = { id: 0, term: '', definition: '', example: '' };
  editingFlashcard: Flashcard | null = null;

  // Add 
  addFlashcard() {
    if (this.newFlashcard.term && this.newFlashcard.definition) {
      this.flashcards.push({
        ...this.newFlashcard,
        id: Date.now()
      });
      this.newFlashcard = { id: 0, term: '', definition: '', example: '' };
    }
  }

  // Update
  startEdit(flashcard: Flashcard) {
    this.editingFlashcard = { ...flashcard };
  }

  // Save 
  saveEdit() {
    if (this.editingFlashcard) {
      const index = this.flashcards.findIndex(f => f.id === this.editingFlashcard!.id);
      if (index !== -1) {
        this.flashcards[index] = { ...this.editingFlashcard };
      }
      this.editingFlashcard = null;
    }
  }

  // Cancel 
  cancelEdit() {
    this.editingFlashcard = null;
  }

  // Delete 
  deleteFlashcard(id: number) {
    this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== id);
  }
}
