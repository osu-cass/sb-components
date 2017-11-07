import * as React from 'react';
import * as Accessibility from './Accessibility';
import * as Dropdown from '../DropDown/DropDown';
interface Props {
    accResourceGroups: Accessibility.AccResourceGroup[];
    onSave(selections: Accessibility.ResourceSelections): void;
    onReset(): void;
}

interface IsResourceExpanded {
    [resourceType: string]: boolean;
}

interface State {
    resourceTypeExpanded: IsResourceExpanded;
    resourceSelections: Accessibility.ResourceSelections;
}

export class ItemAccessibilityModal extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const expandeds: IsResourceExpanded = {};
        const resourceTypes = this.props.accResourceGroups.map((res) => {
            return res.label;
        });
        for (const key of resourceTypes) {
            expandeds[key] = false;
        }
        this.state = {
            resourceTypeExpanded: expandeds,
            resourceSelections: {}
        };
    }

    toggleResourceType(resourceType: string) {
        const expandeds = Object.assign({}, this.state.resourceTypeExpanded || {});
        expandeds[resourceType] = !expandeds[resourceType];

        this.setState({
            resourceTypeExpanded: expandeds
        });
    }

    keyboardToggleResourceType(e: React.KeyboardEvent<HTMLAnchorElement>, resourceType: string): void {
        if (e.keyCode == 23 || e.keyCode == 13) {
            const expandeds = Object.assign({}, this.state.resourceTypeExpanded || {});
            expandeds[resourceType] = !expandeds[resourceType];

            this.setState({
                resourceTypeExpanded: expandeds
            });
        }
    }

    /** Updates the selection based on user input, if item is braille, streamlined mode needs to be adjusted */
    updateSelection = (selectionCode: string, resourceCode: string) => {
        const newSelections = Object.assign({}, this.state.resourceSelections || {});
        newSelections[resourceCode] = selectionCode;
        if (resourceCode === "BrailleType") {
            if (selectionCode == "TDS_BT0") {
                newSelections["StreamlinedInterface"] = "TDS_SLM0";
            } else {
                newSelections["StreamlinedInterface"] = "TDS_SLM1";
            }
        }
        this.setState({ resourceSelections: newSelections });
    }

    onSave = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        this.props.onSave(this.state.resourceSelections || {});

    }

    onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.setState({ resourceSelections: {} });
    }

    onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ resourceSelections: {} });
        this.props.onReset();
    }

    renderResourceType(type: string) {
        let resources = this.props.accResourceGroups
            .filter(group => group.label === type)[0]
            .accessibilityResources;
        let resourceTypeHeader = <h3>{type}</h3>;

        const resCount = resources.length;
        const isExpanded = (this.state.resourceTypeExpanded || {})[type];
        if (!isExpanded) {
            resources = resources.slice(0, 4);
        }

        let dropdowns = resources.map(res => {
            let selectedCode = (this.state.resourceSelections || {})[res.resourceCode] || res.currentSelectionCode;
            let selections = res.selections.filter(s => !s.hidden);
            let ddprops: Dropdown.Props = {
                defaultSelection: res.currentSelectionCode,
                label: res.label,
                selections: selections,
                selectionCode: selectedCode,
                disabled: res.disabled,
                updateSelection: this.updateSelection,
                resourceCode: res.resourceCode
            }
            return <Dropdown.Dropdown{...ddprops} key={res.resourceCode} />;
        });

        let expandButton: JSX.Element | undefined;
        if (resCount <= 4) {
            expandButton = undefined;
        } else if (isExpanded) {
            let ariaText = "Display fewer " + type + "options";
            expandButton =
                <a className="expand-button"
                    tabIndex={0}
                    aria-label={ariaText}
                    onClick={() => this.toggleResourceType(type)}
                    onKeyUp={(e) => this.keyboardToggleResourceType(e, type)}>

                    Show less
                    </a>;
        } else {
            let ariaText = "Display all " + type + " options";
            expandButton =
                <a className="expand-button"
                    tabIndex={0}
                    aria-label={ariaText}
                    onClick={() => this.toggleResourceType(type)}
                    onKeyUp={(e) => this.keyboardToggleResourceType(e, type)}>
                    Show all
                </a>;
        }

        return (
            <div key={type}>
                {resourceTypeHeader}
                <div className="accessibility-dropdowns">
                    {dropdowns}
                </div>
                {expandButton}
            </div>
        );
    }

    render() {
        const types = Accessibility.getResourceTypes(this.props.accResourceGroups);
        const groups = types.map(t => this.renderResourceType(t));
        return (
            <div className="modal fade" id="accessibility-modal-container" tabIndex={-1} role="dialog" aria-labelledby="Accessibility Options Modal" aria-describedby="Accessibility Options Modal" aria-hidden="true">
                <div className="modal-dialog accessibility-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">Accessibility Options</h4>
                        </div>
                        <div className="modal-body">
                            <p><span>Options displayed in grey are not available for this item.</span></p>
                            <p>
                                To experience the <strong>text-to-speech functionality</strong>,&nbsp;
                                    please visit the&nbsp;
                                    <a href="http://www.smarterbalanced.org/assessments/practice-and-training-tests/ " target="_blank">Smarter Balanced Practice Test.</a>

                            </p>
                            <form id="accessibility-form" onSubmit={this.onSave}>
                                <div className="accessibility-groups">
                                    {groups}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" aria-label="Update options and reload item" form="accessibility-form" data-dismiss="modal" onClick={this.onSave}> Update</button>
                            <button className="btn btn-primary" aria-label="Reset all options to default and reload item" data-dismiss="modal" onClick={this.onReset} >Reset to Default</button>
                            <button className="btn btn-primary btn-cancel" aria-label="Cancel and undo changes" data-dismiss="modal" onClick={this.onCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

