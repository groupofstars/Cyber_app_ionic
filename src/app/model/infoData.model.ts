import { Teacher } from "./teacher-model";
import { IUser } from "./user.model";

export interface ICourseInfo {
    id?: number;
    title?: string;
    rate?: number;
    offered?: string;
    duration?: number;
    perweek?: number;
    price?: number;
    description?: string;
    lessons?: ICourseLesson[];
    teachers?: Teacher[];
    sections?: ICourseSection[];
    faq?: AskQuestion[];
    feature_banner?: string;
    is_featured?: boolean;
    is_editor_choice?: boolean;
    is_recommended_choice?: boolean;
    is_enrolled?: boolean;
    live?: ILive;
    outlines?: string[];
    hour_duration?: string;
    chatId?: number;
}
export interface ICourseSection {
    title?: string;
    type?: 'check' | 'text',
    hasIcon?: boolean;
    contents?: string[];
}
export interface ICourseLesson {
    id?: number;
    title?: string;
    isShowed?: boolean;
    time?: string;
    url?: string;
}

export interface AskQuestion {
    id?: number;
    title?: string;
    answer?: string;
}

export interface ILive {
    url?: string;
    is_started?: boolean;
}