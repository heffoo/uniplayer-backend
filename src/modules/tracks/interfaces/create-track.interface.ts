export interface CreateTrack {
  title: string;
  singerName: string;
  albumName?: string;
  duration?: number;
  coverFileId?: string;
  trackFileId: string;
}