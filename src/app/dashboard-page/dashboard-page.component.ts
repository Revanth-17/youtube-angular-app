import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpEventType, HttpEvent } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { VideoDetailComponent } from '../video-detail/video-detail.component';
import { CommentsComponent } from '../comments/comments.component';
import { NotesComponent } from '../notes/notes.component';
import { ActivityLogComponent } from '../activity-log/activity-log.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

import { VideoService } from '../services/video.service';
import { Video } from '../models/video.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    VideoDetailComponent,
    CommentsComponent,
    NotesComponent,
    ActivityLogComponent,
    ThemeToggleComponent,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  videos: Video[] = [];
  uploadProgress: number = 0;

  selectedFile: File | null = null;
  title: string = '';
  description: string = '';
  privacyStatus: string = 'private';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.fetchVideos();
    // debugger
  }

  fetchVideos(): void {
    this.videoService.getAllVideos().subscribe({
      next: (data: Video[]) => this.videos = data,
      error: (err: any) => console.error('Error fetching videos:', err)
    });
    // debugger
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    if (!this.selectedFile) return;

    this.videoService.uploadVideo(
      this.selectedFile as File,
      this.title,
      this.description,
      this.privacyStatus
    )
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            alert('Video uploaded successfully');
            setTimeout(() => {
              this.fetchVideos();
              alert('New videos fetched successfully');
            }, 5000); 
            this.uploadProgress = 0;
            this.selectedFile = null;
            this.title = '';
            this.description = '';
            this.privacyStatus = 'private';
          }
        },
        (err: any) => {
          console.error('Upload failed:', err);
          alert('Upload failed');
        }
      );
  }
}