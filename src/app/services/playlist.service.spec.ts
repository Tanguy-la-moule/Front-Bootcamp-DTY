import { TestBed, inject } from '@angular/core/testing';

import { PlaylistServiceService } from './playlist-service.service';

describe('PlaylistServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistServiceService]
    });
  });

  it('should be created', inject([PlaylistServiceService], (service: PlaylistServiceService) => {
    expect(service).toBeTruthy();
  }));
});
