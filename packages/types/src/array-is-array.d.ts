/* eslint-disable @typescript-eslint/method-signature-style */
interface ArrayConstructor {
  isArray(arg: unknown): arg is unknown[];
}
