import { Test, TestingModule } from '@nestjs/testing';
import { StoryOrdersController } from './story-orders.controller';

describe('StoryOrdersController', () => {
  let controller: StoryOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoryOrdersController],
    }).compile();

    controller = module.get<StoryOrdersController>(StoryOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
