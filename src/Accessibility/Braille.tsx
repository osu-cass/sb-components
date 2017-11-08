import * as React from 'react';

function getCookie(name: string): string | null {
    const nameLenPlus = (name.length + 1);
    return document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null;
}

export interface Props {
    currentSelectionCode: string;
    brailleItemCodes: string[];
    braillePassageCodes: string[];
    bankKey: number;
    itemKey: number;
}

interface State {
    displaySpinner: boolean;

}
export class BrailleLink extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displaySpinner: false
        };
    }

    buildUrl(bankKey: number, itemKey: number, ): string {
        var brailleType = "";
        if (typeof (this.props.brailleItemCodes) != 'undefined' && this.props.brailleItemCodes.indexOf(this.props.currentSelectionCode) > -1) {
            var brailleLoc = this.props.brailleItemCodes.indexOf(this.props.currentSelectionCode);
            brailleType = this.props.brailleItemCodes[brailleLoc];
            return "/Item/Braille?bankKey=" + bankKey + "&itemKey=" + itemKey + "&brailleCode=" + brailleType;

        }
        return "";
    }

    enableSpinner(): void {
        this.setState({
            displaySpinner: true
        });
    }

    disableSpinner(): void {
        this.setState({
            displaySpinner: false
        });
    }

    checkDownloadCookie(count: number) {
        count++;
        if (getCookie("brailleDLstarted") == "1") {
            this.disableSpinner();
            document.cookie = "brailleDLstarted" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
            return;
        }
        if (count > 20) {
            document.cookie = "brailleDLstarted" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
            this.disableSpinner();
            return;
        }
        const dlCheck = this.checkDownloadCookie;
        setTimeout(dlCheck.bind(this), 1000, count);
        return;
    }

    watchForDlStart(): void {
        this.enableSpinner();
        this.checkDownloadCookie(0);
    }

    renderLoading() {
        if (!this.state.displaySpinner) {
            return null;
        } else {
            return (
                <span className="glyphicon glyphicon-refresh glyphicon-pad rotating" />
            );
        }
    }

    render() {
        let brailleUrl = this.buildUrl(this.props.bankKey, this.props.itemKey);
        if (brailleUrl == "") {
            return null;
        } else {
            return (
                <a className={"item-nav-btn"} aria-live="polite" aria-relevant="additions removals"
                    href={brailleUrl}
                    download onClick={() => this.watchForDlStart()}>
                    <span className="glyphicon glyphicon-download-alt glyphicon-pad" />
                    Download Braille Embossing File(s)
                        {this.renderLoading()}
                </a>
            );
        }
    }
}