import * as ItemCard from "./ItemCard";
import * as $ from 'jquery';
import * as GradeLevels from './GradeLevels';
import * as API from './ApiModels';

export interface ScoreSearchParams {
    gradeLevels: GradeLevels.GradeLevels;
    subjects: string[];
    techType: string[];
}

export const ScoreSearchClient = (params: ScoreSearchParams) => API.get<ItemCard.ItemCardViewModel[]>("http://10.162.136.49:5000/ScoringGuide/Search", params) 
