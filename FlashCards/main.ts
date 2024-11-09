import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Import the standalone AppComponent

bootstrapApplication(AppComponent) // Bootstrap the standalone component directly
  .catch(err => console.error(err));
