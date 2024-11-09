import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { StudentService } from './student.service';
import {StudentFormComponent} from './students-form/students-form.component';'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, StudentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  providers: {StudentService}
})
export class AppComponent {
  title = 'StudentApps';
}
