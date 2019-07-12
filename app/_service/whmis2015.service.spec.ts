/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Whmis2015Service } from './whmis2015.service';

describe('Service: Whmis2015', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Whmis2015Service]
    });
  });

  it('should ...', inject([Whmis2015Service], (service: Whmis2015Service) => {
    expect(service).toBeTruthy();
  }));
});
