import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}/api/notes`;

  constructor(private http: HttpClient) {}

  // ✅ Get all notes for a specific video
  getNotesByVideoId(videoId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/video/${videoId}`);
  }


  // ✅ Add a note (you must pass videoId in the note object)
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.apiUrl}/addnote`, note);
  }

  // ✅ Delete a note by its ID
  deleteNote(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${noteId}`);
  }
}
