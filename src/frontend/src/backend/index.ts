// Stub backend module — Caffeine platform placeholder (no Motoko backend deployed)

import type { Identity } from "@dfinity/agent";

export interface backendInterface {
  _initializeAccessControlWithSecret: (token: string) => Promise<void>;
}

export interface CreateActorOptions {
  agentOptions?: {
    identity?: Identity | Promise<Identity>;
    host?: string;
  };
}

export type ProgressCallback = (progress: number) => void;

export class ExternalBlob {
  public onProgress: ProgressCallback | undefined = undefined;

  constructor(
    private _bytes: Uint8Array = new Uint8Array(),
    private _url?: string,
  ) {}

  async getBytes(): Promise<Uint8Array> {
    if (this._url) {
      const response = await fetch(this._url);
      const buf = await response.arrayBuffer();
      return new Uint8Array(buf);
    }
    return this._bytes;
  }

  static fromURL(url: string): ExternalBlob {
    return new ExternalBlob(new Uint8Array(), url);
  }

  static fromBytes(bytes: Uint8Array): ExternalBlob {
    return new ExternalBlob(bytes);
  }
}

type UploadFile = (file: ExternalBlob) => Promise<Uint8Array>;
type DownloadFile = (bytes: Uint8Array) => Promise<ExternalBlob>;

export async function createActor(
  _canisterId: string,
  _uploadFile?: UploadFile,
  _downloadFile?: DownloadFile,
  _options?: CreateActorOptions,
): Promise<backendInterface> {
  return {
    _initializeAccessControlWithSecret: async () => {},
  };
}

export const idlFactory = {};
export const canisterId = "";
