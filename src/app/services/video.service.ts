import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Video } from '../models/video.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideo(id: string): Observable<Video> {
    return this.http.get<Video>(`${environment.apiUrl}/dashboard/video/${id}`);
  }

  updateVideo(video: Video): Observable<Video> {
    return this.http.put<Video>(`${environment.apiUrl}/dashboard/video/${video.id}`, video);
  }
   // ✅ NEW: Get all videos
  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiUrl}/dashboard/youtube/videos`);
  }

  // ✅ NEW: Upload a new video file
  uploadVideo(file: File, title: string, description: string, privacyStatus: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title); 
    formData.append('description', description); 
    formData.append('privacyStatus', privacyStatus); 
    return this.http.post(`${environment.apiUrl}/dashboard/video/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
