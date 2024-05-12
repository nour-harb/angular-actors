import { TestBed } from '@angular/core/testing';

import { ApiThemoviedbService } from './api-themoviedb.service';

describe('ApiThemoviedbService', () => {
  let service: ApiThemoviedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiThemoviedbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
