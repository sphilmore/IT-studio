import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommunityService } from './community.service';
import { CommunityFormComponent } from './community-form/community-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    CommunityFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CommunityService]
})
export class AppComponent implements OnInit {
  title = 'Learning Community';
  
  // Declare a variable to hold slang data and make it public to be accessible from the component's HTML
  public slangTerms: any;

  // Initialize the call using CommunityService
  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.getSlangTerms();
  }

  // Method called on OnInit
  getSlangTerms() {
    this.communityService.getSlangTerms().subscribe({
      next: (data => { this.slangTerms = data; }),
      error: (err => console.error(err)),
      complete: (() => console.log('finished loading'))
    });
  }

  onDelete(postId: string) {
    this.communityService.deletePost(postId);
  }
}
