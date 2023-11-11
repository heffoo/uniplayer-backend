import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { plainToInstance } from 'class-transformer';
import { TrackDto } from './dto/track.dto';
import { TracksListDto } from './dto/tracks-list.dto';
import { Track } from '../../tracks/entities/track.entity';
import { PlaylistsToTracks } from '../../playlists-to-tracks/entities/playlists-to-tracks.entity';

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

  async create(consumerId: string, id: string, createTrackDto: CreateTrackDto) {
    // todo: Добавлять трек в дефолтный плейлист
    // todo: Сделать этот роут добавлением трека в плейлист.
    //  Простое добавление трека в систему с добавлением в
    //  дефолтный плейлист перенести в Tracks.
    //  То же сделать с обновлением!
    const playlist = await this.findConsumerPlaylist(consumerId, id);

    const newTrack = await this.tracksRepository.save(
      this.tracksRepository.create(createTrackDto),
    );

    const maxWeight = await this.playlistsToTracksRepository.maximum('weight');
    const newRelation = await this.playlistsToTracksRepository.save(
      this.playlistsToTracksRepository.create({
        trackId: newTrack.id,
        playlistId: playlist.id,
        weight: maxWeight + 1,
      }),
    );

    return plainToInstance(TrackDto, newTrack);
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

    return plainToInstance(TracksListDto, {
      items,
      count,
    });
  }

  async findOne(consumerId: string, id: string, trackId: string) {
    const playlist = await this.findConsumerPlaylist(consumerId, id);
    const track = await this.findConsumerTrack(consumerId, trackId);
    const relation = await this.findPlaylistToTrackRelation(playlist.id, trackId);
    return plainToInstance(TrackDto, track);
  }

  async update(
    consumerId: string,
    id: string,
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ) {
    const playlist = await this.findConsumerPlaylist(consumerId, id);
    const track = await this.findConsumerTrack(consumerId, trackId);
    const relation = await this.findPlaylistToTrackRelation(playlist.id, trackId);

    const updatedTrack = this.tracksRepository.update(
      { id: trackId },
      this.tracksRepository.create({ ...track, ...updateTrackDto }),
    );
    return plainToInstance(TrackDto, updatedTrack);
  }

  async remove(consumerId: string, id: string, trackId: string) {
    const playlist = await this.findConsumerPlaylist(consumerId, id);
    const track = await this.findConsumerTrack(consumerId, trackId);
    const relation = await this.findPlaylistToTrackRelation(playlist.id, trackId);

    return this.tracksRepository.remove(track);
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

  private async findPlaylistToTrackRelation(playlistId: string, trackId: string) {
    const relation = await this.playlistsToTracksRepository.findOneBy({
      playlistId,
      trackId,
    });
    if (!relation) {
      throw new NotFoundException('Relation between Playlist and Track not found');
    }

    return relation;
  }
}
