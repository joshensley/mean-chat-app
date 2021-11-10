import { TestBed } from '@angular/core/testing';

import { RegisterLoginGuardService } from './register-login-guard.service';

describe('RegisterLoginGuardService', () => {
  let service: RegisterLoginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterLoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
