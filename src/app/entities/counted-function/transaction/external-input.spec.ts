import { Complexity } from 'src/app/enums/complexity';
import { ExternalInput } from './external-input';

describe('ExternalInput', () => {
  it('should create an instance', () => {
    expect(new ExternalInput()).toBeTruthy();
  });
});

describe('ExternalInput.calculateContribution()', () => {
  it('should return correct values', () => {
    const testObject = new ExternalInput();

    expect(testObject.calculateContribution(Complexity.LOW)).toEqual(3);
    expect(testObject.calculateContribution(Complexity.MEDIUM)).toEqual(4);
    expect(testObject.calculateContribution(Complexity.HIGH)).toEqual(6);
  });
});

describe('ExternalInput.calculateComplexity()', () => {

  // Elementary in low range
  it('should return LOW complexity when dataTypes is on low data types range and elementaryTypes is on low elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 4, elementaryTypes = 1;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.LOW);
  });

  it('should return LOW complexity when dataTypes is on medium data types range and elementaryTypes is on low elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 14, elementaryTypes = 1;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.LOW);
  });

  it('should return MEDIUM complexity when dataTypes is on high data types range and elementaryTypes is on low elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 24, elementaryTypes = 1;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.MEDIUM);
  });

  // Elementary in mid range
  it('should return LOW complexity when dataTypes on low data types range and elementaryTypes is medium elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 4, elementaryTypes = 2;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.LOW);
  });

  it('should return MEDIUM complexity when dataTypes is on medium data type range and elementaryTypes is on medium elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 14, elementaryTypes = 2;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.MEDIUM);
  });

  it('should return HIGH complexity when dataTypes is on high data types range and elementaryTypes is on medium elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 24, elementaryTypes = 2;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.HIGH);
  });

  // Elementary in high
  it('should return MEDIUM complexity when dataTypes is on low data types range and elementaryTypes is on high elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 4, elementaryTypes = 3;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.MEDIUM);
  });

  it('should return HIGH complexity when dataTypes is on medium data types range and elementaryTypes is on high elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 14, elementaryTypes = 3;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.HIGH);
  });

  it('should return HIGH complexity when dataTypes is on high data types range and elementaryTypes is on high elementary types range', () => {
    const testObject = new ExternalInput();
    const dataTypes = 24, elementaryTypes = 3;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.HIGH);
  });

});
