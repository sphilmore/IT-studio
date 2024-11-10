import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommunityService } from './community.service';
import { CommunityFormComponent } from './community-form/community-form.component';

interface SlangTerm {
  _id: string;
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-learning-community',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CommunityFormComponent
  ],
  templateUrl: './learning-community.component.html',
  styleUrls: ['./learning-community.component.css'],
  providers: [CommunityService]
})
export class LearningCommunityComponent implements OnInit {
  title = 'Learning Community';
  public slangTerms: SlangTerm[] = [];

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.getSlangTerms();
  }

  getSlangTerms() {
    this.communityService.getSlangTerms().subscribe({
      next: (data: SlangTerm[]) => { this.slangTerms = data; },
      error: (error: Error) => console.error(error),
      complete: () => console.log('finished loading')
    });
  }

  onDelete(postId: string) {
    this.communityService.deletePost(postId);
  }
} 