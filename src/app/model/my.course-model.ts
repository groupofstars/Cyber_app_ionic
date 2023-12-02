import { Data } from "@angular/router";
import { ICourseInfo } from "./infoData.model";

export interface IMyCourse {
    course?: ICourseInfo;
    chatId: number;
    courseId?: number;
    created?: Data;
    id?: number;
    status?: number;
    updated?: number;
    userId?: number;
    certificated?: boolean;
    certificateNo?: string;
}