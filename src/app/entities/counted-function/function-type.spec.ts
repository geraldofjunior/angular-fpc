import { ExternalQuery } from './transaction/external-query';
import { ExternalOutput } from './transaction/external-output';
import { ExternalInput } from './transaction/external-input';
import { ExternalInterfaceFunction } from './data/external-interface-function';
import { InternalLogicalFile } from './data/internal-logical-file';

describe('FunctionType', () => {
  expect(new ExternalInterfaceFunction()).toBeTruthy();
  expect(new InternalLogicalFile()).toBeTruthy();
  expect(new ExternalInput()).toBeTruthy();
  expect(new ExternalOutput()).toBeTruthy();
  expect(new ExternalQuery()).toBeTruthy();
});
