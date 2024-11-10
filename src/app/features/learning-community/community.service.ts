import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SlangTerm {
  _id: string;
  id: string;
  title: string;
  content: string;
}

interface CommunityResponse {
  message: string;
  data?: any;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class CommunityService {
  constructor(private http: HttpClient) {}

  getSlangTerms(): Observable<SlangTerm[]> {
    return this.http.get<SlangTerm[]>('http://localhost:8000/learningcommunity');
  }

  addCommunityPost(title: string, content: string): void {
    this.http.post<CommunityResponse>('http://localhost:8000/community', { title, content }, httpOptions)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: Error) => {
          console.error('Error adding post:', error);
        }
      });
    location.reload();
  }

  deletePost(postId: string): void {
    this.http.delete<CommunityResponse>(`http://localhost:8000/learningcommunity/${postId}`)
      .subscribe({
        next: () => {
          console.log('Deleted post:', postId);
        },
        error: (error: Error) => {
          console.error('Error deleting post:', error);
        }
      });
    location.reload();
  }
} 