import { Test, TestingModule } from '@nestjs/testing';
import { StoryOrdersService } from './story-orders.service';

describe('StoryOrdersService', () => {
  let service: StoryOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryOrdersService],
    }).compile();

    service = module.get<StoryOrdersService>(StoryOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
