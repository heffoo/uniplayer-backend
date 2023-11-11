import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('playlists')
@Controller('playlists')
@UseGuards(AuthGuard)
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(
    @Headers('consumerId') consumerId: string,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    return this.playlistsService.create(consumerId, createPlaylistDto);
  }

  @Get()
  findAll(
    @Headers('consumerId') consumerId: string,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.playlistsService.findAll(consumerId, paginationQueryDto);
  }

  @Get(':id')
  findOne(@Headers('consumerId') consumerId: string, @Param('id') id: string) {
    return this.playlistsService.findOne(consumerId, id);
  }

  @Patch(':id')
  update(
    @Headers('consumerId') consumerId: string,
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(consumerId, id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Headers('consumerId') consumerId: string, @Param('id') id: string) {
    return this.playlistsService.remove(consumerId, id);
  }
}
