/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExporListService } from './exporList.service';

describe('Service: ExporList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExporListService]
    });
  });

  it('should ...', inject([ExporListService], (service: ExporListService) => {
    expect(service).toBeTruthy();
  }));
});
