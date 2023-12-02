import { ICourseItem } from "./course.model";
import { ICourseInfo } from "./infoData.model";

export interface ISliderData {
    title: string;
    description: string;
    items: ICourseInfo[];
}
