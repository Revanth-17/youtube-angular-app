export interface Comment {
  id: string;
  content: string;
  author?: string;
  parentId?: number;
  replyMode?: boolean;
  replyText?: string;
  replies?: Comment[]; 
  videoId?: string;
  text?: string;
}
