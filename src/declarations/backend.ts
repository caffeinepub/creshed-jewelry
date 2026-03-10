// Stub backend interface for frontend-only builds
export interface backendInterface {
  _initializeAccessControlWithSecret: (token: string) => Promise<void>;
  [key: string]: (...args: unknown[]) => Promise<unknown>;
}

export const idlFactory = {};
export const canisterId = "";
