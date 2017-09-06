import * as React from 'react';
import * as Rubric from './Rubric';
import * as AboutItem from './AboutItem';
import * as PageTabs from './PageTabs';
import * as ItemViewerFrame from './ItemViewerFrame';
import * as ItemInformation from './ItemInformation';
import * as ItemInformationDetail from './ItemInformationDetail';
import * as ApiModels from './ApiModels';

export interface Props {
    item?: { bankKey: number, itemKey: number }
}

export interface State {
    aboutItem: ApiModels.Resource<AboutItem.AboutThisItem>;
    selectedTab: PageTabs.Tabs;
}

export class ItemCardViewer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTab: "viewer",
            aboutItem: { kind: "loading" }
        }
    }

    getAboutItem() {
        if (this.props.item) {
            AboutItem.ScoreSearchClient(this.props.item)
                .then((data) => this.onSearchSuccess(data))
                .catch((err) => this.onSearchError(err));
        }
    }

    onSearchSuccess(data: AboutItem.AboutThisItem) {
        this.setState({
            aboutItem: { kind: "success", content: data }
        })
    }

    onSearchError(err: ExceptionInformation) {
        console.log(err);
    }

    onTabChange(tab: PageTabs.Tabs) {
        this.setState({
            selectedTab: tab
        });
    }

    renderViewer(url: string) {
        return (
            <div className="item-content">
                <ItemViewerFrame.ItemFrame url={url} />
            </div>
        );
    }

    renderRubric() {
        if (this.state.aboutItem.kind == "success" && this.state.aboutItem.content) {
            const rubrics = this.state.aboutItem.content.rubrics.map((ru, i) => <Rubric.RubricComponent {...ru } key={String(i)} />)
            return (
                <div className="item-content">{rubrics}</div>
            );
        }
    }

    renderInformation() {
        if (this.state.aboutItem.kind == "success" && this.state.aboutItem.content) {
            const aboutItem = this.state.aboutItem.content;
            return (
                <div className="item-content">
                    <div><ItemInformationDetail.ItemInformationDetail
                        itemCardViewModel={aboutItem.itemCardViewModel}
                        depthOfKnowledge={aboutItem.depthOfKnowledge}
                        commonCoreStandardsDescription={aboutItem.commonCoreStandardsDescription}
                        targetDescription={aboutItem.targetDescription}
                        educationalDifficulty={aboutItem.educationalDifficulty}
                        evidenceStatement={aboutItem.evidenceStatement} />
                    </div>
                </div>
            );
        }
    }

    renderChosen() {
        let selectedTab = null;
        if (this.state.aboutItem.kind == "success" && this.state.aboutItem.content) {
            const selectedTab = this.state.selectedTab;
            const itemCard = this.state.aboutItem.content.itemCardViewModel;

            let resultElement: JSX.Element[] | JSX.Element | undefined;
            if (selectedTab == "viewer") {
                const url = "http://ivs.smarterbalanced.org/items?ids=" + itemCard.bankKey.toString() + "-" + itemCard.itemKey.toString();
                resultElement = <div> {this.renderViewer(url)} </div>
            }
            else if (selectedTab == "rubric") {
                resultElement = <div> {this.renderRubric()} </div>
            }
            else if (selectedTab == "information") {
                resultElement = <div> {this.renderInformation()}</div>
            }
            return resultElement;
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