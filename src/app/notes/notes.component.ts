// src/app/notes/notes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { CommentService } from '../services/comment.service';
import { Note } from '../models/note.model';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  videoId!: string;

  notes: Note[] = [];
  comments: Comment[] = [];

  newNoteContent: string = '';
  newCommentContent: string = '';
  replyModes: { [key: string]: boolean } = {};
  replyTexts: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('videoId');
      if (id) {
        this.videoId = id;
        this.fetchNotes();
        this.fetchComments();
      }
    });
  }

  fetchNotes(): void {
    this.noteService.getNotesByVideoId(this.videoId).subscribe(data => {
      this.notes = data;
    });
  }

  addNote(): void {
    const newNote: Note = { content: this.newNoteContent, videoId: this.videoId } as Note;
    this.noteService.addNote(newNote).subscribe(note => {
      this.notes.push(note);
      this.newNoteContent = '';
    });
  }

  deleteNote(noteId?: number): void {
    if (!noteId) return;
    this.noteService.deleteNote(noteId).subscribe(() => {
      this.notes = this.notes.filter(n => n.id !== noteId);
    });
  }

  fetchComments(): void {
    this.commentService.getComments(this.videoId).subscribe(data => {
      this.comments = data;
      // initialize reply modes
      this.comments.forEach(c => this.replyModes[c.id] = false);
    });
  }

  addComment(): void {
    const comment: Comment = { content: this.newCommentContent } as Comment;
    this.commentService.addComment(this.videoId, comment).
      subscribe(newC => {
        this.comments.push(newC);
        this.newCommentContent = '';
        this.replyModes[newC.id] = false;
      });
  }

  toggleReply(id: string): void {
    this.replyModes[id] = !this.replyModes[id];
  }

  submitReply(parentId: string): void {
    const reply: Comment = { content: this.replyTexts[parentId] } as Comment;
    this.commentService.replyToComment(parentId, reply)
      .subscribe(newReply => {
        const parent = this.comments.find(c => c.id === parentId);
        if (parent) {
          parent.replies = parent.replies || [];
          parent.replies.push(newReply);
        }
        this.replyTexts[parentId] = '';
        this.replyModes[parentId] = false;
      });
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(c => c.id !== commentId);
    });
  }

  visitVideo(): void {
    window.open(`https://www.youtube.com/watch?v=${this.videoId}`, '_blank');
  }
}
