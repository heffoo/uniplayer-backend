import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlaylistTracksService } from './playlist-tracks.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { ConsumerId } from '../../../common/decorators/consumer-id.decorator';
import { AddPlaylistTrackDto } from './dto/add-playlist-track.dto';

@ApiTags('playlist-tracks')
@Controller('playlists')
@UseGuards(AuthGuard)
export class PlaylistTracksController {
  constructor(private readonly tracksService: PlaylistTracksService) {}

  @Post(':id/tracks')
  create(
    @ConsumerId() consumerId: string,
    @Param('id') id: string,
    @Body() addPlaylistTrackDto: AddPlaylistTrackDto,
  ) {
    return this.tracksService.create(consumerId, id, addPlaylistTrackDto);
  }

  @Get(':id/tracks')
  findAll(@ConsumerId() consumerId: string, @Param('id') id: string) {
    return this.tracksService.findAll(consumerId, id);
  }

  @Delete(':id/tracks/:trackId')
  remove(
    @ConsumerId() consumerId: string,
    @Param('id') id: string,
    @Param('trackId') trackId: string,
  ) {
    return this.tracksService.remove(consumerId, id, trackId);
  }
}
