import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistsToTracks } from './entities/playlists-to-tracks.entity';
import { Repository } from 'typeorm';
import { Playlist } from '../playlists/entities/playlist.entity';
import { Track } from '../tracks/entities/track.entity';
import { plainToInstance } from 'class-transformer';
import { PlaylistsToTracksDto } from './dto/playlists-to-tracks.dto';

@Injectable()
export class PlaylistsToTracksService {
  constructor(
    @InjectRepository(PlaylistsToTracks)
    private readonly playlistsToTracksRepository: Repository<PlaylistsToTracks>,
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async create(consumerId: string, playlistId: string, trackId: string) {
    const maxWeight = await this.playlistsToTracksRepository.maximum('weight');

    const playlist = await this.findConsumerPlaylist(consumerId, playlistId);
    const track = await this.findConsumerPlaylist(consumerId, trackId);

    const newRelation = await this.playlistsToTracksRepository.save(
      this.playlistsToTracksRepository.create({
        playlistId,
        trackId,
        weight: maxWeight + 1,
      }),
    );

    return plainToInstance(PlaylistsToTracksDto, newRelation);
  }

  private async findConsumerPlaylist(consumerId: string, id: string) {
    const playlist = await this.playlistsRepository.findOneBy({
      id,
      creatorId: consumerId,
    });

    if (!playlist) {
      throw new NotFoundException();
    }

    return playlist;
  }

  private async findConsumerTrack(consumerId: string, id: string) {
    const track = await this.tracksRepository.findOneBy({
      id,
      creatorId: consumerId,
    });

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }
}
