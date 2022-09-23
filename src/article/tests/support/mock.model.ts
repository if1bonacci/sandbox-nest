export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructorSpy(_createEntityData: T): void {}

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  find(): { exec: () => T[] } {
    return {
      exec: (): T[] => [this.entityStub],
    };
  }

  async deleteOne(): Promise<void> {
    return undefined;
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  findOneAndUpdate(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }
}
