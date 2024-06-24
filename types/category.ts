import { Content } from "newt-client-js";

export type Category = {
  name: string;
  slug: string;
} & Content;