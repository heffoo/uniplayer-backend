export interface Track {
  id: string;
  title: string;
  singerName: string;
  albumName: string | null;
  coverFileId: string | null;
  trackFileId: string;
}