// place files you want to import through the `$lib` alias in this folder.
import * as edgedb from "edgedb";

export const client = edgedb.createClient();