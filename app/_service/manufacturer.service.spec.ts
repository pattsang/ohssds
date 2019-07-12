/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManufacturerService } from './manufacturer.service';

describe('Service: Manufacturer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufacturerService]
    });
  });

  it('should ...', inject([ManufacturerService], (service: ManufacturerService) => {
    expect(service).toBeTruthy();
  }));
});
