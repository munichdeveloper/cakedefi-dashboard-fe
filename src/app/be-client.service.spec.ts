import {TestBed} from '@angular/core/testing';

import {BeClientService} from './be-client.service';

describe('BeClientService', () => {
  let service: BeClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
