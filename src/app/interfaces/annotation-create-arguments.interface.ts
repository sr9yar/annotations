import { IAnnotation } from "./annotation.interface";

export interface IAnnotationCreateArguments extends Omit<IAnnotation, "id" | "text" | "image"> {
  text?: string;
  image?: string;
}
