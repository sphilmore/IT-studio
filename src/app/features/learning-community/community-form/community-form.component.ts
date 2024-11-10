import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-community-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.css']
})
export class CommunityFormComponent {
  constructor(private _myService: CommunityService) {}

  communityForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.communityForm.valid) {
      const title = this.communityForm.get('title')?.value ?? "";
      const content = this.communityForm.get('content')?.value ?? "";
      this._myService.addCommunityPost(title, content);
      this.communityForm.reset();
    }
  }
} 