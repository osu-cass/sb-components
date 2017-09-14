import * as $ from 'jquery';
import { GradeLevels } from './GradeLevels';
import * as API from './ApiModels';
import * as ItemCardViewModel from './ItemCardViewModel';

export interface Subject {
    code: string;
    label: string;
}

export interface TechType extends Subject { }

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
