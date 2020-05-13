import { TestBed } from '@angular/core/testing';
import { LoginGardService } from './login-gard.service';

describe('LoginGardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginGardService = TestBed.get(LoginGardService);
    expect(service).toBeTruthy();
  });
});
