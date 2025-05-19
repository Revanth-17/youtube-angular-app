import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  // Fetch all comments (with nested replies) for a video
  getComments(videoId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.baseUrl}/video/${videoId}/comments`
    );
  }

  // Post a top-level comment
  addComment(videoId: string, comment: Comment): Observable<Comment> {
    const params = new HttpParams().set('commentText', comment.content);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post<Comment>(
      `${this.baseUrl}/video/${videoId}/comment`,
      params.toString(),
      { headers }
    );
  }

  // Reply to an existing comment
  replyToComment(commentId: string, reply: Comment): Observable<Comment> {
    const params = new HttpParams().set('replyText', reply.content);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post<Comment>(
      `${this.baseUrl}/comment/${commentId}/reply`,
      params.toString(),
      { headers }
    );
  }

  // Delete a comment by ID
  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/comment/${commentId}`
    );
  }
}
