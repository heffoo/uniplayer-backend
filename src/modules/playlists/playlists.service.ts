import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PlaylistDto } from './dto/playlist.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { PlaylistsListDto } from './dto/playlists-list.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
  ) {}

  async create(consumerId: string, createPlaylistDto: CreatePlaylistDto) {
    const maxWeight = await this.playlistsRepository.maximum('weight');
    const newPlaylist = this.playlistsRepository.create({
      ...createPlaylistDto,
      weight: maxWeight + 1,
      creatorId: consumerId,
    });

    await this.playlistsRepository.save(newPlaylist);

    return plainToInstance(PlaylistDto, newPlaylist);
  }

  async findAll(consumerId: string, paginationQueryDto: PaginationQueryDto) {
    const [items, count] = await this.playlistsRepository.findAndCount({
      where: { creatorId: consumerId },
      take: paginationQueryDto.limit,
      skip: paginationQueryDto.offset,
      order: { weight: 'ASC' },
    });

    return plainToInstance(PlaylistsListDto, {
      items,
      count,
    });
  }

  async findOne(consumerId: string, id: string) {
    const playlist = await this.playlistsRepository.findOneBy({
      id,
      creatorId: consumerId,
    });

    if (!playlist) {
      throw new NotFoundException();
    }

    return playlist;
  }

  async update(
    consumerId: string,
    id: string,
    updatePlaylistDto: UpdatePlaylistDto,
  ) {
    const playlist = await this.playlistsRepository.findOneBy({
      id,
      creatorId: consumerId,
      persistent: false,
    });

    if (!playlist) {
      throw new NotFoundException();
    }

    await this.playlistsRepository.update(id, updatePlaylistDto);
  }

  async remove(consumerId: string, id: string) {
    const playlist = await this.playlistsRepository.findOneBy({
      id,
      creatorId: consumerId,
      persistent: false,
    });

    if (!playlist) {
      throw new NotFoundException();
    }

    await this.playlistsRepository.delete(id);
  }
}
