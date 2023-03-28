import { LocalForage } from './local-forage';

describe('LocalForage', () => {
  it('should create an instance', () => {
    expect(new LocalForage()).toBeTruthy();
  });
});
