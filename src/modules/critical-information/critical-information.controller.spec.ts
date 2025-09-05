import { Test, TestingModule } from '@nestjs/testing';
import { CriticalInformationController } from './critical-information.controller';
import { CriticalInformationService } from './critical-information.service';

describe('CriticalInformationController', () => {
  let controller: CriticalInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriticalInformationController],
      providers: [CriticalInformationService],
    }).compile();

    controller = module.get<CriticalInformationController>(CriticalInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
