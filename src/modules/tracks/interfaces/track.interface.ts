export interface Track {
  id: string;
  title: string;
  singerName: string;
  albumName: string | null;
  duration: number | null;
  coverFileId: string | null;
  trackFileId: string;
}