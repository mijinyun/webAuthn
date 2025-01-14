// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { Client } from "edgedb";

declare global {
  namespace App {
    interface Locals {
      db: Client;
    }
  }
}

export {};