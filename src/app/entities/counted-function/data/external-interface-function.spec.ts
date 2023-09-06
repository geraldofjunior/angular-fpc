import { Complexity } from 'src/app/enums/complexity';
import { ExternalInterfaceFunction } from './external-interface-function';

describe('ExternalInterfaceFunction', () => {
  it('should create an instance', () => {
    expect(new ExternalInterfaceFunction()).toBeTruthy();
  });
});

describe('ExternalInterfaceFunction.calculateContribution()', () => {
  it('should return correct values', () => {
    const testObject = new ExternalInterfaceFunction();

    expect(testObject.calculateContribution(Complexity.LOW)).toEqual(5);
    expect(testObject.calculateContribution(Complexity.MEDIUM)).toEqual(7);
    expect(testObject.calculateContribution(Complexity.HIGH)).toEqual(10);
  });
});

describe('ExternalInterfaceFunction.calculateComplexity()', () => {

  // Elementary in low range
  it('should return LOW complexity when dataTypes is on low data types range and elementaryTypes is on low elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 10, elementaryTypes = 1;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.LOW);
  });

  it('should return LOW complexity when dataTypes is on medium data types range and elementaryTypes is on low elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 30, elementaryTypes = 1;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.LOW);
  });

  it('should return MEDIUM complexity when dataTypes is on high data types range and elementaryTypes is on low elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 60, elementaryTypes = 1;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.MEDIUM);
  });

  // Elementary in mid range
  it('should return LOW complexity when dataTypes on low data types range and elementaryTypes is medium elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 10, elementaryTypes = 3;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.LOW);
  });

  it('should return MEDIUM complexity when dataTypes is on medium data type range and elementaryTypes is on medium elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 30, elementaryTypes = 3;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.MEDIUM);
  });

  it('should return HIGH complexity when dataTypes is on high data types range and elementaryTypes is on medium elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 60, elementaryTypes = 3;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.HIGH);
  });

  // Elementary in high
  it('should return MEDIUM complexity when dataTypes is on low data types range and elementaryTypes is on high elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 10, elementaryTypes = 6;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.MEDIUM);
  });

  it('should return HIGH complexity when dataTypes is on medium data types range and elementaryTypes is on high elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 30, elementaryTypes = 6;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.HIGH);
  });

  it('should return HIGH complexity when dataTypes is on high data types range and elementaryTypes is on high elementary types range', () => {
    const testObject = new ExternalInterfaceFunction();
    const dataTypes = 60, elementaryTypes = 6;
    expect(testObject.calculateComplexity(elementaryTypes, dataTypes)).toEqual(Complexity.HIGH);
  });

});
