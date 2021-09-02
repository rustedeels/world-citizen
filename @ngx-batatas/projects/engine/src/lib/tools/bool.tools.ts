export class BoolState {
  private __state = false;

  /**
   * Trigger state to true
   * @returns true if state was changed
   */
  public triggerOn(): boolean {
    if (this.__state) return false;
    this.__state = true;
    return true;
  }
}
