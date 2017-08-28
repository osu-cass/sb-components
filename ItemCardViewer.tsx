import * as React from 'react';
import * as Rubric from './Rubric';
import * as AboutItem from './AboutItem';
import * as PageTabs from './PageTabs';
import * as ItemViewerFrame from './ItemViewerFrame';
import * as ItemInformation from './ItemInformation';


export interface Props {
    aboutItem: AboutItem.AboutThisItem
}

export interface State {
    selectedTab: PageTabs.Tabs;
}

export class ItemCardViewer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTab: "viewer"
        };
    }

    onTabChange(tab: PageTabs.Tabs) {
        this.setState({
            selectedTab: tab
        });
    }

    renderChosen() {
        const selectedTab = this.state.selectedTab;
        const itemCard = this.props.aboutItem.itemCardViewModel;

        if (selectedTab == "viewer") {
            const url = "http://ivs.smarterbalanced.org/items?ids=" + itemCard.bankKey.toString() + "-" + itemCard.itemKey.toString();
            return (
                <div className="item-content">
                    <ItemViewerFrame.ItemFrame url={url} />
                </div>
            );
        }
        else if (selectedTab == "rubric") {
            const rubrics = this.props.aboutItem.rubrics.map((ru, i) => <Rubric.RubricComponent {...ru } key={String(i)} />)
            return (
                <div className="item-content">{rubrics}</div>
            );
        }
        else if (selectedTab == "information") {
            return (
                <div className="item-content">
                    <div><ItemInformation.ItemInformationDetail
                        itemCardViewModel={this.props.aboutItem.itemCardViewModel}
                        depthOfKnowledge={this.props.aboutItem.depthOfKnowledge}
                        commonCoreStandardsDescription={this.props.aboutItem.commonCoreStandardsDescription}
                        targetDescription={this.props.aboutItem.targetDescription}
                        educationalDifficulty={this.props.aboutItem.educationalDifficulty}
                        evidenceStatement={this.props.aboutItem.evidenceStatement}/>
                    </div>
                </div>
            );
        }
    }

    render() {
        const tabs = PageTabs.ItemTabs;
        return (
            <div className="item-card">
                <PageTabs.ItemTabs changedTab={(tab) => this.onTabChange(tab)} selectedTab={this.state.selectedTab} />
                {this.renderChosen()}
            </div>
        );
    }
}