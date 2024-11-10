import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Notebook {
  id: number;
  title: string;
}

@Component({
  selector: 'app-favorite-phrases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favorite-phrases.component.html',
  styleUrls: ['./favorite-phrases.component.css']
})
export class FavoritePhrasesComponent implements OnInit {
  notebooks: Notebook[] = [];
  newNotebook: string = '';

  ngOnInit() {
    // Add some initial notebooks for testing
    this.notebooks = [
      { id: 1, title: 'Common Phrases' },
      { id: 2, title: 'Business Terms' },
      { id: 3, title: 'Technical Vocabulary' }
    ];
  }

  addNotebook() {
    if (this.newNotebook.trim()) {
      const newEntry = { 
        id: Date.now(), 
        title: this.newNotebook 
      };
      this.notebooks.push(newEntry);
      this.newNotebook = '';
    }
  }

  editNotebook(notebook: Notebook) {
    const newTitle = prompt('Edit Notebook Title:', notebook.title);
    if (newTitle) {
      notebook.title = newTitle;
    }
  }

  deleteNotebook(id: number) {
    this.notebooks = this.notebooks.filter(notebook => notebook.id !== id);
  }
} 