import { PrimengCustomModule } from './primeng-custom.module';

describe('PrimengCustomModule', () => {
  let primengCustomModule: PrimengCustomModule;

  beforeEach(() => {
    primengCustomModule = new PrimengCustomModule();
  });

  it('should create an instance', () => {
    expect(primengCustomModule).toBeTruthy();
  });
});
