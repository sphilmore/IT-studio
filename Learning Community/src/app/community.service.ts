import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class CommunityService {

  constructor(private http: HttpClient) {}

  getSlangTerms() {
    return this.http.get('http://localhost:8000/learningcommunity');
  }

  addCommunityPost(title: string, content: string) {
    this.http.post('http://localhost:8000/community', { title, content })
      .subscribe((responseData) => {
        console.log(responseData);
      });
    location.reload();
  }

  deletePost(postId: string) {
    this.http.delete(`http://localhost:8000/learningcommunity/${postId}`)
      .subscribe(() => {
        console.log('Deleted post: ' + postId);
      });
      location.reload()
  }
}
