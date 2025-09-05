import { Test, TestingModule } from '@nestjs/testing';
import { CriticalInformationService } from './critical-information.service';

describe('CriticalInformationService', () => {
  let service: CriticalInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriticalInformationService],
    }).compile();

    service = module.get<CriticalInformationService>(CriticalInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
