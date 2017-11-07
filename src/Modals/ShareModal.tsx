import * as React from 'react';

function getItemUrl(): string {
    let fullUrl = window.location.href;
    //Strip off any exsisting iSAAP codes or anchors/fragments
    let url = fullUrl.split("#")[0].split("&isaap=")[0];
    return url;
}

interface Props {
    iSAAP: string;
}

export class ShareModal extends React.Component<Props, {}>{
    constructor(props: Props) {
        super(props);
    }

    copyToClipboard(event: any): void {
        event.preventDefault();
        let input = document.getElementById("shareUrl") as HTMLTextAreaElement;
        input.select();
        document.execCommand("copy");
    }

    render() {
        const url = getItemUrl() + "&isaap=" + this.props.iSAAP;
        return (
            <div className="modal fade" id="share-modal-container" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog share-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">Share</h4>
                        </div>
                        <div className="modal-body ">
                            <span>The following URL can be used to load this question with your currently saved accessibility options.</span>
                            <div className="input-group">
                                <input type="text" className="form-control readonly-select" id="shareUrl" style={{ "maxWidth": "inherit" }} readOnly={true} value={decodeURIComponent(url)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" id="copy-button" onClick={this.copyToClipboard}>
                                        <span className="glyphicon glyphicon-copy" aria-hidden="true"></span>
                                        <span> Copy to clipboard</span>
                                    </button>
                                </span>
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
