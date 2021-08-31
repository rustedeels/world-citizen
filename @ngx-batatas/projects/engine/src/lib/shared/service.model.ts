/** Allow service to be initiated */
export interface ServiceInit {
  init(): Promise<void>;
}

/** Service can be reseted to initial state */
export interface ServiceReset {
  reset(): Promise<void>;
}
