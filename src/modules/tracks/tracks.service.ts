import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { Playlist } from '../playlists/entities/playlist.entity';
import { CreateTrack } from './interfaces/create-track.interface';
import { PlaylistsToTracks } from '../playlists-to-tracks/entities/playlists-to-tracks.entity';
import { plainToInstance } from 'class-transformer';
import { TrackDto } from './dto/track.dto';
import { UpdateTrack } from './interfaces/update-track.interface';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    @InjectRepository(PlaylistsToTracks)
    private readonly playlistsToTracksRepository: Repository<PlaylistsToTracks>,
  ) {}

  async findOne(consumerId: string, id: string) {
    const track = await this.findConsumerTrack(consumerId, id);
    return plainToInstance(TrackDto, {
      ...track,
      playlistIds: track?.playlistsToTracks?.map((ptt) => ptt.playlistId),
    });
  }

  async create(consumerId: string, createTrackDto: CreateTrack) {
    const playlist = await this.playlistsRepository.findOneBy({
      title: 'Все треки',
      creatorId: consumerId,
    });

    const newTrack = await this.tracksRepository.save(
      this.tracksRepository.create({
        ...createTrackDto,
        creatorId: consumerId,
      }),
    );

    const maxWeight = await this.playlistsToTracksRepository.maximum('weight');
    const newRelation = await this.playlistsToTracksRepository.save(
      this.playlistsToTracksRepository.create({
        trackId: newTrack.id,
        playlistId: playlist.id,
        weight: maxWeight + 1,
      }),
    );

    return plainToInstance(
      TrackDto,
      await this.findConsumerTrack(consumerId, newTrack.id),
    );
  }

  async update(consumerId: string, id: string, updateTrackDto: UpdateTrack) {
    const track = await this.findConsumerTrack(consumerId, id);
    const updatedTrack = this.tracksRepository.update(
      { id },
      this.tracksRepository.create({ ...track, ...updateTrackDto }),
    );
    return plainToInstance(
      TrackDto,
      await this.findConsumerTrack(consumerId, id),
    );
  }

  private async findConsumerTrack(consumerId: string, id: string) {
    const track = await this.tracksRepository
      .createQueryBuilder('track')
      .innerJoinAndMapMany(
        'track.playlistsToTracks',
        PlaylistsToTracks,
        'playlists_to_tracks',
        'track.id = playlists_to_tracks."trackId"',
      )
      .where({
        id,
        creatorId: consumerId,
      })
      .getOne();

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }
}
