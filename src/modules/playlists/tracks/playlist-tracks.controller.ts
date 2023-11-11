import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlaylistTracksService } from './playlist-tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('tracks')
@Controller('playlists')
@UseGuards(AuthGuard)
export class PlaylistTracksController {
  constructor(private readonly tracksService: PlaylistTracksService) {}

  @Post(':id/tracks')
  create(@Param('id') id: string, @Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(id, createTrackDto);
  }

  @Get(':id/tracks')
  findAll(@Param('id') id: string) {
    return this.tracksService.findAll(id);
  }

  @Get(':id/tracks/:trackId')
  findOne(@Param('id') id: string, @Param('trackId') trackId: string) {
    return this.tracksService.findOne(id, trackId);
  }

  @Patch(':id/tracks/:trackId')
  update(@Param('id') id: string, @Param('trackId') trackId: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, trackId, updateTrackDto);
  }

  @Delete(':id/tracks/:trackId')
  remove(@Param('id') id: string, @Param('trackId') trackId: string) {
    return this.tracksService.remove(id, trackId);
  }
}
