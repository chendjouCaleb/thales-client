export function assert(state: boolean, message: string = 'Assertions failed: Expected true, but is false') {
  if (!state) {
    throw new Error(message)
  }
}
