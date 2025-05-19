export interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
    localized: {
      title: string;
      description: string;
    };
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  statistics: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
    favoriteCount: number;
    dislikeCount: number;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
    hasCustomThumbnail: boolean;
  };
}
