import * as React from 'react';
import { ItemCardViewModel } from '../ItemCard/ItemCardModels';
import * as ItemCardCondensed from '../ItemCard/ItemCardCondensed';

export interface Column {
    label: string;
    itemCards: ItemCardViewModel[];
}

export interface Props {
    gradeBelowItems: Column | null;
    sameGradeItems: Column;
    gradeAboveItems: Column | null;
}

export class Modal extends React.Component<Props, {}> {

    renderColumn(column: Column | null) {
        if (!column || column.label == "NA") {
            return undefined;
        }

        const noneLabel = "No items found for this grade.";

        const items = column.itemCards.length ?
            column.itemCards.map(c => <ItemCardCondensed.ItemCardCondensed key={c.bankKey + "-" + c.itemKey} {...c} />)
            : noneLabel;

        return (
            <div className="more-like-this-column">
                <div><h3>{column.label}</h3></div>
                {items}
            </div>
        );
    }

    render() {
        return (
            <div className="modal fade" id="more-like-this-modal-container" tabIndex={-1} role="dialog" aria-labelledby="More Like This Modal" aria-hidden="true">
                <div className="modal-dialog more-like-this-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">More Like This</h4>
                        </div>
                        <div className="modal-body">
                            <br />
                            <div className="more-like-this">
                                {this.renderColumn(this.props.gradeBelowItems)}
                                {this.renderColumn(this.props.sameGradeItems)}
                                {this.renderColumn(this.props.gradeAboveItems)}
                            </div>        
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
