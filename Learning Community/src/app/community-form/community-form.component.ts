import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-community-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.css']
})
export class CommunityFormComponent {
 
  // Initialize the service
  constructor(private _myService: CommunityService) {}

  communityForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  onSubmit() {
    const title = this.communityForm.get('title')?.value ?? "";
    const content = this.communityForm.get('content')?.value ?? "";
    console.log("You submitted: " + title + "\n" + content);
    this._myService.addCommunityPost(title, content);
  }
}
