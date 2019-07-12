/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthoritytreeService } from './authoritytree.service';

describe('Service: Authoritytree', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthoritytreeService]
    });
  });

  it('should ...', inject([AuthoritytreeService], (service: AuthoritytreeService) => {
    expect(service).toBeTruthy();
  }));
});
