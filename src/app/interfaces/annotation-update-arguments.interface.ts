import { IAnnotationCreateArguments } from "./annotation-create-arguments.interface";
import { IAnnotation } from "./annotation.interface";

export interface IAnnotationUpdateArguments extends Pick<IAnnotation, 'id'>, Partial<IAnnotationCreateArguments> {

}
