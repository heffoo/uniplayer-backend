import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TracksService } from './tracks.service';
import { ConsumerId } from '../../common/decorators/consumer-id.decorator';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('tracks')
@Controller('tracks')
@UseGuards(AuthGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get(':id')
  findOne(
    @ConsumerId() consumerId: string,
    @Param('id') id: string,
  ) {
    return this.tracksService.findOne(consumerId, id);
  }

  @Post()
  create(
    @ConsumerId() consumerId: string,
    @Body() createTrackDto: CreateTrackDto,
  ) {
    return this.tracksService.create(consumerId, createTrackDto);
  }

  @Patch(':id')
  update(
    @ConsumerId() consumerId: string,
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(consumerId, id, updateTrackDto);
  }
}
