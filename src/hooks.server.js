import * as edgedb from "edgedb";

export const handle = async ({ event, resolve }) => {
  const client = edgedb.createClient();
  event.locals.db = client;

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    }
  });
};