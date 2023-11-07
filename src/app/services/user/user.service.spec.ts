import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/entities/user/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserService] });
    service = TestBed.inject(UserService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('updateUser', () => {
    it('makes expected calls', () => {
      const userStub: User = <any>{};
      spyOn(userStub, 'getHoursPerFP').and.callThrough();
      spyOn(userStub, 'getPricePerFP').and.callThrough();
      spyOn(userStub, 'getFunctionPointsPerStoryPoint').and.callThrough();
      service.updateUser(userStub);
      expect(userStub.getHoursPerFP).toHaveBeenCalled();
      expect(userStub.getPricePerFP).toHaveBeenCalled();
      expect(userStub.getFunctionPointsPerStoryPoint).toHaveBeenCalled();
    });
  });
});
