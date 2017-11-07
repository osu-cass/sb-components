import * as React from 'react';
import * as $ from "jquery";
import * as Boostrap from 'bootstrap';

export interface Props {
    subject: string;
    description: string;
    isPerformance: boolean;
}

function readCookie(name: string): string | undefined {
    var cookie = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookie ? cookie.pop() : '';
}

export class Modal extends React.Component<Props, {}> {

    shouldShowOnLoad(): void {
        if (!this.props.isPerformance) {
            return;
        }
        var visitedBefore = false;
        //Cookies only store strings
        if (this.props.subject.toLowerCase() === "math") {
            visitedBefore = (readCookie("visitedMathPerfItem") == "true");
            document.cookie = "visitedMathPerfItem=true";
        } else if (this.props.subject.toLowerCase() === "ela") {
            visitedBefore = (readCookie("visitedELAPerfItem") == "true");
            document.cookie = "visitedELAPerfItem=true";
        }
        if (!visitedBefore) {
            $('#about-performance-tasks-popup-modal-container').modal('show');
        }
    }
    getSubjectText(): string {
        switch (this.props.subject.toLowerCase()) {
            case "math":
                return "Math";
            case "ela":
                return "ELA";
            default:
                return "";
        }
    }

    getSubjectHeader(): string {
        switch (this.props.subject.toLowerCase()) {
            case "math":
                return "Note about Math Performance Task Items";
            case "ela":
                return "Note about ELA Performance Task Items";
            default:
                return "";
        }
    }


    render() {
        this.shouldShowOnLoad();
        const header = this.getSubjectHeader();
        return (
            <div className="modal fade" id="about-performance-tasks-popup-modal-container" tabIndex={-1} role="dialog" aria-hidden="true" aria-labelledby="About Performance Tasks" aria-describedby="About Performance Tasks">
                <div className="modal-dialog share-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{header}</h4>
                        </div>
                        <div className="modal-body">
                            <p dangerouslySetInnerHTML={{ __html: this.props.description }} />
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
