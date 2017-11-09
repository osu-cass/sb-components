import * as Boostrap from "bootstrap";
import * as $ from "jquery";
import * as React from "react";

export interface AboutPtPopupModalProps {
  subject: string;
  description: string;
  isPerformance: boolean;
}

function readCookie(name: string): string | undefined {
  const cookie = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return cookie ? cookie.pop() : "";
}

export class AboutPTPopupModal extends React.Component<
  AboutPtPopupModalProps,
  {}
> {
  shouldShowOnLoad(): void {
    if (!this.props.isPerformance) {
      return;
    }
    let visitedBefore = false;
    //Cookies only store strings
    if (this.props.subject.toLowerCase() === "math") {
      visitedBefore = readCookie("visitedMathPerfItem") == "true";
      document.cookie = "visitedMathPerfItem=true";
    } else if (this.props.subject.toLowerCase() === "ela") {
      visitedBefore = readCookie("visitedELAPerfItem") == "true";
      document.cookie = "visitedELAPerfItem=true";
    }
    if (!visitedBefore) {
      $("#about-performance-tasks-popup-modal-container").modal("show");
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
      <div
        className="modal fade"
        id="about-performance-tasks-popup-modal-container"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        aria-labelledby="About Performance Tasks"
        aria-describedby="About Performance Tasks"
      >
        <div className="modal-dialog share-modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                {header}
              </h4>
            </div>
            <div className="modal-body">
              <p dangerouslySetInnerHTML={{ __html: this.props.description }} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
