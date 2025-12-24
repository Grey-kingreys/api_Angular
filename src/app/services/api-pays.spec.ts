import { TestBed } from '@angular/core/testing';

import { ApiPays } from './api-pays';

describe('ApiPays', () => {
  let service: ApiPays;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPays);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
