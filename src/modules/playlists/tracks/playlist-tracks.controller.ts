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
import { ConsumerId } from '../../../common/decorators/consumer-id.decorator';

@ApiTags('tracks')
@Controller('playlists')
@UseGuards(AuthGuard)
export class PlaylistTracksController {
  constructor(private readonly tracksService: PlaylistTracksService) {}

  // @Post(':id/tracks')
  // create(
  //   @ConsumerId() consumerId: string,
  //   @Param('id') id: string,
  //   @Body() createTrackDto: CreateTrackDto,
  // ) {
  //   return this.tracksService.create(consumerId, id, createTrackDto);
  // }

  @Get(':id/tracks')
  findAll(@ConsumerId() consumerId: string, @Param('id') id: string) {
    return this.tracksService.findAll(consumerId, id);
  }

  @Get(':id/tracks/:trackId')
  findOne(
    @ConsumerId() consumerId: string,
    @Param('id') id: string,
    @Param('trackId') trackId: string,
  ) {
    return this.tracksService.findOne(consumerId, id, trackId);
  }

  // @Patch(':id/tracks/:trackId')
  // update(
  //   @ConsumerId() consumerId: string,
  //   @Param('id') id: string,
  //   @Param('trackId') trackId: string,
  //   @Body() updateTrackDto: UpdateTrackDto,
  // ) {
  //   return this.tracksService.update(consumerId, id, trackId, updateTrackDto);
  // }

  @Delete(':id/tracks/:trackId')
  remove(
    @ConsumerId() consumerId: string,
    @Param('id') id: string,
    @Param('trackId') trackId: string,
  ) {
    return this.tracksService.remove(consumerId, id, trackId);
  }
}
