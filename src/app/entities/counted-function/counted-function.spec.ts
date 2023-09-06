import { ExternalQuery } from './transaction/external-query';
import { ExternalOutput } from './transaction/external-output';
import { ExternalInput } from './transaction/external-input';
import { ExternalInterfaceFunction } from './data/external-interface-function';
import { InternalLogicalFile } from './data/internal-logical-file';
import { CountedFunction } from './counted-function';

describe('CountedFunction', () => {
  it('should create an instance', () => {
    expect(new CountedFunction(new InternalLogicalFile(), "Internal Logical File Test")).toBeTruthy();
    expect(new CountedFunction(new ExternalInterfaceFunction(), "External Interface Function Test")).toBeTruthy();
    expect(new CountedFunction(new ExternalInput(), "External Input Test")).toBeTruthy();
    expect(new CountedFunction(new ExternalOutput(), "External Output Test")).toBeTruthy();
    expect(new CountedFunction(new ExternalQuery(), "External Query Test")).toBeTruthy();
  });
});

describe('CountedFunction accessors', () => {
  it('should get name with no errors', () => {
    const testObject = new CountedFunction(new InternalLogicalFile(), "Test function");
    const result = testObject.getName();
    expect(result).toBe("Test function");
  });

  it("should set name with no error", () => {
    const testObject = new CountedFunction(new InternalLogicalFile());
    testObject.setName("Test function");
    const result = testObject.getName();
    expect(result).toBe("Test function");
  });
});
