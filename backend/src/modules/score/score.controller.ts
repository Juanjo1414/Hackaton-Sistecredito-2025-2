import { Controller, Get, Param } from '@nestjs/common';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly service: ScoreService) {}

  @Get(':personId')
  async getScore(@Param('personId') personId: number) {
    return this.service.calculateScore(+personId);
  }
}