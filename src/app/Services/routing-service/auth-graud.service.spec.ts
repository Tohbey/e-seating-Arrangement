import { TestBed } from '@angular/core/testing';

import { AuthGraudService } from './auth-graud.service';

describe('AuthGraudService', () => {
  let service: AuthGraudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGraudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
