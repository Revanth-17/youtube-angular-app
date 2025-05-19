import { Component } from '@angular/core';
// import { Comment } from '../../models/comment.model';
// import { CommentService } from '../../services/comment.service';
import { Comment } from '../models/comment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  comments: Comment[] = [];
  newCommentText: string = '';

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments("1").subscribe(data => {
      this.comments = data;
    });
  }

  addComment() {
    if (!this.newCommentText) return;
    const comment: Comment = { id: Date.now().toString(), content: this.newCommentText };
    this.commentService.addComment("1", comment).subscribe(() => {
      this.newCommentText = '';
      this.loadComments();
    });
  }

  reply(comment: any) {
    comment.replyMode = true;
    comment.replyText = '';
  }

  addReply(comment: any) {
    if (!comment.replyText) return;
    const reply: Comment = { id: Date.now().toString(), content: comment.replyText, parentId: comment.id };
    this.commentService.replyToComment(comment.id, reply).subscribe(() => {
      comment.replyMode = false;
      this.loadComments();
    });
  }

  delete(comment: Comment) {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.loadComments();
    });
  }
}
