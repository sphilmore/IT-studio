
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite-phrases',
  templateUrl: './favorite-phrases.component.html'
})
export class FavoritePhrasesComponent {
  notebooks = []; // List to store notebooks
  newNotebook = ''; // Model for new notebook title

  // Add a new notebook
  addNotebook() {
    const newEntry = { id: Date.now(), title: this.newNotebook };
    this.notebooks.push(newEntry);
    this.newNotebook = ''; // Reset the input
  }

  // Edit an existing notebook
  editNotebook(notebook) {
    const newTitle = prompt('Edit Notebook Title:', notebook.title);
    if (newTitle) {
      notebook.title = newTitle;
    }
  }

  // Delete a notebook
  deleteNotebook(id) {
    this.notebooks = this.notebooks.filter(notebook => notebook.id !== id);
  }
}
