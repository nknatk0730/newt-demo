import { Content } from "newt-client-js";

export type Staff =  {
  fullName: string
  profileImage: {
    src: string;
  } 
} & Content;