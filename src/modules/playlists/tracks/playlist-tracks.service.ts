import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { plainToInstance } from 'class-transformer';
import { PlaylistTracksListDto } from './dto/playlist-tracks-list.dto';
import { Track } from '../../tracks/entities/track.entity';
import { PlaylistsToTracks } from '../../playlists-to-tracks/entities/playlists-to-tracks.entity';
import { AddPlaylistTrack } from './interfaces/add-playlist-track.interface';

@Injectable()
export class PlaylistTracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    @InjectRepository(PlaylistsToTracks)
    private readonly playlistsToTracksRepository: Repository<PlaylistsToTracks>,
  ) {}

  async create(
    consumerId: string,
    id: string,
    addPlaylistTrackDto: AddPlaylistTrack,
  ) {
    const playlist = await this.findConsumerPlaylist(consumerId, id);
    const track = await this.findConsumerTrack(
      consumerId,
      addPlaylistTrackDto.trackId,
    );
    const maxWeight = await this.playlistsToTracksRepository.maximum('weight');

    const newRelation = await this.playlistsToTracksRepository.save(
      this.playlistsToTracksRepository.create({
        trackId: track.id,
        playlistId: playlist.id,
        weight: maxWeight + 1,
      }),
    );

    return;
  }

  async findAll(consumerId: string, id: string) {
    const playlist = await this.findConsumerPlaylist(consumerId, id);

    const [items, count] = await this.tracksRepository
      .createQueryBuilder('track')
      .innerJoinAndSelect(
        PlaylistsToTracks,
        'playlists_to_tracks',
        'track.id = playlists_to_tracks."trackId"',
      )
      .where(`playlists_to_tracks."playlistId" = '${playlist.id}'::UUID`)
      .orderBy('playlists_to_tracks.weight', 'ASC')
      .getManyAndCount();

    return plainToInstance(PlaylistTracksListDto, {
      items,
      count,
    });
  }

  async remove(consumerId: string, id: string, trackId: string) {
    const playlist = await this.findConsumerPlaylist(consumerId, id);
    const track = await this.findConsumerTrack(consumerId, trackId);
    const relation = await this.findPlaylistToTrackRelation(
      playlist.id,
      trackId,
    );

    return this.playlistsToTracksRepository.remove(relation);
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
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  private async findPlaylistToTrackRelation(
    playlistId: string,
    trackId: string,
  ) {
    const relation = await this.playlistsToTracksRepository.findOneBy({
      playlistId,
      trackId,
    });
    if (!relation) {
      throw new NotFoundException(
        'Relation between Playlist and Track not found',
      );
    }

    return relation;
  }
}
