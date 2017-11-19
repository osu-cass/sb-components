import { SearchAPIParamsModel } from '../ItemSearchModels';
import { ItemSearch } from '../ItemSearch';
import { ItemCardModel } from '../../ItemCard/ItemCardModels';
import { itemCards } from './ItemSearchModelsTestData';
import { GradeLevels, GradeLevel } from '../../GradeLevels/GradeLevels';

describe('ItemSearch.filterItemCards', () => {
    it('filters with empty filter', () => {
        const params: SearchAPIParamsModel = {};
        const result = ItemSearch.filterItemCards(itemCards, params);

        expect(result).toHaveLength(itemCards.length);
        itemCards.forEach(card =>
            expect(result).toContain(card)
        );
    });

    it('works without cards', () => {
        const params: SearchAPIParamsModel = {
            gradeLevels: GradeLevels.Middle,
            subjects: ['ELA'],
            claims: ['ELA4']
        };
        const result = ItemSearch.filterItemCards([], params);
        expect(result).toHaveLength(0);
    });

    it('filters based on subject, claim, and target', () => {
        const params: SearchAPIParamsModel = {
            subjects: ['ELA'],
            claims: ['ELA4'],
            targets: [2832]
        };
        const result = ItemSearch.filterItemCards(itemCards, params);
        const expectedCards = itemCards.filter(c =>
            c.subjectCode === 'ELA' && c.claimCode === 'ELA4' && c.targetHash === 2832
        );

        expect(result).toHaveLength(1);
        expect(result).toContain(expectedCards[0]);
    });

    it('filters based on grade', () => {
        const params: SearchAPIParamsModel = {
            gradeLevels: GradeLevels.Middle
        };
        const result = ItemSearch.filterItemCards(itemCards, params);
        const expectedCards = itemCards.filter(c =>
            GradeLevel.gradeLevelContains(GradeLevels.Middle, c.grade)
        );

        expect(result).toHaveLength(expectedCards.length);
        expectedCards.forEach(card =>
            expect(result).toContain(card)
        );
    });

    it('filters for cat items only', () => {
        const params: SearchAPIParamsModel = {
            catOnly: true
        };
        const result = ItemSearch.filterItemCards(itemCards, params);
        const expectedCards = itemCards.filter(c => !c.isPerformanceItem);

        expect(result).toHaveLength(expectedCards.length);
        expectedCards.forEach(card =>
            expect(result).toContain(card)
        );
    });

    it('filters for performance items only', () => {
        const params: SearchAPIParamsModel = {
            performanceOnly: true
        };
        const result = ItemSearch.filterItemCards(itemCards, params);
        const expectedCards = itemCards.filter(c => c.isPerformanceItem);

        expect(result).toHaveLength(expectedCards.length);
        expectedCards.forEach(card =>
            expect(result).toContain(card)
        );
    });
});