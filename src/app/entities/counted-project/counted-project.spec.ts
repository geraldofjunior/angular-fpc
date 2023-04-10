import { ProjectType } from 'src/app/enums/project-type';
import { CountedProject } from './counted-project';

describe('CountedProject', () => {
  it('should create an instance', () => {
    expect(new CountedProject(ProjectType.APPLICATION, "app")).toBeTruthy();
    expect(new CountedProject(ProjectType.DEVELOPMENT, "dev")).toBeTruthy();
    expect(new CountedProject(ProjectType.ENHANCMENT, "enhance")).toBeTruthy();
  });
});
