import { InfluenceType } from 'src/app/enums/influence-type';
import { InfluenceFactor } from './influence-factor';

describe('InfluenceFactor', () => {
  it('should create an instance', () => {
    expect(new InfluenceFactor(InfluenceType.COMPLEX_PROCESSING, 0)).toBeTruthy();
  });
});
