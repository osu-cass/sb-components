import * as React from 'react';

export interface Props {
    subject: string;
    description: string;
}
export class Modal extends React.Component<Props, {}> {
    //TODO: REFACTOR
    getSubjectHeader(): string {
        switch (this.props.subject.toLowerCase()) {
            case "math":
                return "Note about Math Performance Task Items: ";
            case "ela":
                return "Note about ELA Performance Task Items: ";
            default:
                return "";
        }
    }

    render() {
        const ptheader = this.getSubjectHeader();
        return (
            <div className="modal fade" id="about-performance-tasks-modal-container" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog share-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">About Performance Tasks</h4>
                        </div>
                        <div className="modal-body">
                            <p>
                                <b>Performance tasks</b> measure a student’s ability to demonstrate critical-thinking and
                                        problem-solving skills.
                                        Performance tasks challenge students to apply their knowledge and skills to respond to
                                        complex real-world problems. They can be best described as collections of questions and
                                        activities that are coherently connected to a single theme or scenario. These activities
                                        are meant to measure capacities such as depth of understanding, writing and research
                                        skills, and complex analysis, which cannot be adequately assessed with traditional
                                        assessment questions. The performance tasks are taken on a computer (but are not computer
                                        adaptive) and will take one to two class periods to complete.
                                </p>
                            <p><b>{ptheader}</b>
                                <span dangerouslySetInnerHTML={{ __html: this.props.description }} />
                            </p>

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

