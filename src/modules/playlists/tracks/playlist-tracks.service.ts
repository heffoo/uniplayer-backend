import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { plainToInstance } from 'class-transformer';
import { TrackDto } from './dto/track.dto';
import { TracksListDto } from './dto/tracks-list.dto';

@Injectable()
export class PlaylistTracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
  ) {}
  async create(id: string, createTrackDto: CreateTrackDto) {
    const playlist = await this.playlistsRepository.findOneBy({ id });
    if (!playlist) {
      throw new NotFoundException();
    }

    const newTrack = await this.tracksRepository.save(
      this.tracksRepository.create(createTrackDto),
    );

    return plainToInstance(TrackDto, newTrack);
  }

  async findAll(id: string) {
    const playlist = await this.playlistsRepository.findOneBy({ id });
    if (!playlist) {
      throw new NotFoundException();
    }

    // todo: фильтр по плейлисту
    const [items, count] = await this.tracksRepository.findAndCount({});

    return plainToInstance(TracksListDto, {
      items,
      count,
    });
  }

  async findOne(id: string, trackId: string) {
    const playlist = await this.playlistsRepository.findOneBy({ id });
    if (!playlist) {
      throw new NotFoundException();
    }

    const track = await this.tracksRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return plainToInstance(TrackDto, track);
  }

  async update(id: string, trackId: string, updateTrackDto: UpdateTrackDto) {
    const playlist = await this.playlistsRepository.findOneBy({ id });
    if (!playlist) {
      throw new NotFoundException();
    }

    const track = await this.tracksRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = this.tracksRepository.update({ id: trackId }, this.tracksRepository.create({ ...track, ...updateTrackDto }));
    return plainToInstance(TrackDto, updatedTrack);
  }

  async remove(id: string, trackId: string) {
    const playlist = await this.playlistsRepository.findOneBy({ id });
    if (!playlist) {
      throw new NotFoundException();
    }

    const track = await this.tracksRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.tracksRepository.remove(track);
  }
}
