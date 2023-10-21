import { ProjectType } from 'src/app/enums/project-type';
import { CountedProject } from './counted-project';
import { CountedFunction } from '../counted-function/counted-function';
import { InternalLogicalFile } from '../counted-function/data/internal-logical-file';
import { Complexity } from 'src/app/enums/complexity';

describe('CountedProject', () => {
  it('should create an instance', () => {
    expect(new CountedProject(ProjectType.APPLICATION, "app")).toBeTruthy();
    expect(new CountedProject(ProjectType.DEVELOPMENT, "dev")).toBeTruthy();
    expect(new CountedProject(ProjectType.ENHANCMENT, "enhance")).toBeTruthy();
  });
});

describe('CountedProject function management', () => {
  it('should add a function', () => {
    const project = new CountedProject(ProjectType.APPLICATION, "Test App");
    const func = new CountedFunction(new InternalLogicalFile(), "Test function");

    project.addFunction(func);

    expect(project.getFunction(0)).toBeTruthy();
    expect(project.getFunction(0).getName()).toEqual("Test function");
  });
  it('should get all functions', () => {
    const project = new CountedProject(ProjectType.APPLICATION, "Test App");
    const funcList = mockFunctionList();
    funcList.forEach(element => { project.addFunction(element) });

    const testList = project.getAllFunctions();

    expect(testList).toBeTruthy();
    expect(testList.length).toEqual(5);
  });
  it('should get a specific function', () => {
    const project = new CountedProject(ProjectType.APPLICATION, "Test App");
    const funcList = mockFunctionList();
    funcList.forEach(element => { project.addFunction(element) });

    const testFunction = project.searchFunction("Mock function No. 2");

    expect(testFunction).toBeTruthy();
    expect(testFunction.getName()).toEqual('Mock function No. 2');
  });
  it('should delete a function', () => {
    const project = new CountedProject(ProjectType.APPLICATION, "Test App");
    const funcList = mockFunctionList();
    funcList.forEach(element => { project.addFunction(element) });

    project.removeFunction("Mock function No. 3");
    const testFunctions = project.getAllFunctions();

    expect(testFunctions.length).toEqual(4);
    expect(testFunctions.find(func => func.getName() === "Mock function No. 3")).toBeFalsy();
    expect(() => project.searchFunction("Mock function No. 3")).toThrow(new Error("Function not found"));
  });
  it('should update a specific function', () => {
    const project = new CountedProject(ProjectType.APPLICATION, "Test App");
    const funcList = mockFunctionList();
    funcList.forEach(element => { project.addFunction(element) });

    const testFunction = project.getFunction(3);
    testFunction.setDataTypes(40);
    testFunction.setElementaryTypes(8);
    testFunction.setName("Updated function test");
    project.updateFunction("Mock function No. 4", testFunction);
    const updatedFunction = project.getFunction(3);

    expect(updatedFunction.getName()).toEqual("Updated function test");
    expect(updatedFunction.getDataTypes()).toEqual(40);
    expect(updatedFunction.getComplexity()).toEqual(Complexity.HIGH);
    expect(project.searchFunction("Updated function test")).toBeTruthy();
  });
})
/*
describe('CountedProject adjustment factors management', () => {
  it('should add a factor');
  it('should get all adjustment factors');
  it('should get a specific factor');
  it('should delete a factor');
  it('should update a factor');
})
*/
describe('CountedProject calculations', () => {
  it('should calculate W/O any adjustment factor', () => {
    const project = new CountedProject(ProjectType.APPLICATION, "Test App");
    const funcList = mockFunctionList();
    funcList.forEach(element => { project.addFunction(element) });

    const count = project.calculatePoints();

    expect(count).toEqual(41);
  })
  //it('should calculate with adjusment factors')
});

function mockFunctionList(): Array<CountedFunction> {
  const functionList = new Array<CountedFunction>;
  for(let i = 1; i <= 5; i++) {
    const dummyFunction = new CountedFunction(new InternalLogicalFile(), "Mock function No. " + i );
    dummyFunction.setDataTypes(i*5).setElementaryTypes(i);
    functionList.push(dummyFunction);
  }
  return functionList;
}
