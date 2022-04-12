import { TestBed } from '@angular/core/testing';

import { ProccessService } from './proccess.service';

describe('ProccessService', () => {
  let service: ProccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
