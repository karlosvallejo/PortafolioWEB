import { OtherComponentsModule } from './otherComponents.module';

describe('OtherComponentsModule', () => {
  let testModule: OtherComponentsModule;

  beforeEach(() => {
    testModule = new OtherComponentsModule();
  });

  it('should create an instance', () => {
    expect(testModule).toBeTruthy();
  });
});
