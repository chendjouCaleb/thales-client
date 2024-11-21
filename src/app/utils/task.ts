export enum TaskState {
  Pristine,
  Loading,
  Error,
  Success
}

export class Task<TResult> {
  private _state: TaskState = TaskState.Pristine
  get state(): TaskState {
    return this._state;
  }

  private _result: TResult
  get result(): TResult {
    return this._result;
  }

  private _error: Error
  get error(): any {
    return this._error;
  }

  constructor(public readonly fn: () => Promise<TResult>) {
  }

  async launch() {
   try {
     this._state = TaskState.Loading;
     this._result = await this.fn();
     this._state = TaskState.Success;
   }catch (e) {
     console.error(e);
     this._error = e;
     this._state = TaskState.Error
   }
  }

  get success(): boolean { return this._state == TaskState.Success }
  get pristine(): boolean { return this._state == TaskState.Pristine }
  get failed(): boolean { return this._state == TaskState.Error }
  get loading(): boolean { return this._state == TaskState.Loading }
}
