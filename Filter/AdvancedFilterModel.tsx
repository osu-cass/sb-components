import { GradeLevels } from "../Models/GradeLevels";

export interface LabelValue {
    label:string;
    value: string | number;
}

export interface Selection {
    fieldName: string;
    infoDescription: string;
    options: LabelValue[];
}

export interface TechType extends Subject { }

export interface Subject {
    code: string;
    label: string;
}

export interface ItemFilter {
    subject?: Subject;
    grade?: GradeLevels;
    techType?: TechType; 
}

export interface FilterOptions {
    subjects: Subject[];
    grades: GradeLevels[];
    techTypes: TechType[];
}