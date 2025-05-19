import { Component } from '@angular/core';
import { Video } from '../models/video.model';
import { VideoService } from '../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent {
  video: Video = { 
    id: "1",
    snippet: {
      title: '',
      description: '',
      thumbnails: {},
      localized: { title: '', description: '' }
    },
    statistics: {
      viewCount: 0,
      likeCount: 0,
      dislikeCount: 0,
      commentCount: 0,
      favoriteCount: 0
    },
    contentDetails: {
      duration: '',
      dimension: '',
      definition: '',
      caption: '',
      licensedContent: false,
      projection: '',
      hasCustomThumbnail: false
    }
  };

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    // Fetch video info from backend
    this.videoService.getVideo(this.video.id).subscribe(data => {
      this.video = data;
    });
  }

  save() {
    this.videoService.updateVideo(this.video).subscribe(result => {
      console.log('Video updated', result);
    });
  }
}
