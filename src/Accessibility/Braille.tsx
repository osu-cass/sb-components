import * as React from "react";

function getCookie(name: string): string | undefined {
  const nameLenPlus = name.length + 1;

  return (
    document.cookie
      .split(";")
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || undefined
  );
}

export interface BrailleLinkProps {
  currentSelectionCode: string;
  brailleItemCodes?: string[];
  braillePassageCodes?: string[];
  bankKey: number;
  itemKey: number;
}

export interface BrailleLinkState {
  displaySpinner: boolean;
}
export class BrailleLink extends React.Component<
  BrailleLinkProps,
  BrailleLinkState
> {
  constructor(props: BrailleLinkProps) {
    super(props);
    this.state = {
      displaySpinner: false
    };
  }

  buildUrl(bankKey: number, itemKey: number): string {
    let url = "";
    const { brailleItemCodes } = this.props;

    if (
      brailleItemCodes &&
      brailleItemCodes.indexOf(this.props.currentSelectionCode) > -1
    ) {
      const brailleLoc = brailleItemCodes.indexOf(
        this.props.currentSelectionCode
      );
      const brailleType = brailleItemCodes[brailleLoc];

      url = `/Item/Braille?bankKey=${bankKey}&itemKey=${itemKey}&brailleCode=${brailleType}`;
    }

    return url;
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
    const innerCount = count + 1;
    if (getCookie("brailleDLstarted") === "1") {
      this.disableSpinner();
      document.cookie =
        "brailleDLstarted" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";

      return;
    }
    if (innerCount > 20) {
      document.cookie =
        "brailleDLstarted" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
      this.disableSpinner();

      return;
    }
    const dlCheck = this.checkDownloadCookie;
    setTimeout(dlCheck.bind(this), 1000, innerCount);

    return;
  }

  watchForDlStart(): void {
    this.enableSpinner();
    this.checkDownloadCookie(0);
  }

  renderLoading() {
    let content;
    if (this.state.displaySpinner) {
      content = (
        <span className="glyphicon glyphicon-refresh glyphicon-pad rotating" />
      );
    }

    return content;
  }

  render() {
    const brailleUrl = this.buildUrl(this.props.bankKey, this.props.itemKey);
    let content;
    if (brailleUrl !== "") {
      content = (
        <a
          className={"item-nav-btn btn btn-default btn-sm about-pt-btn"}
          aria-live="polite"
          aria-relevant="additions"
          href={brailleUrl}
          download
          onClick={() => this.watchForDlStart()}
        >
          <span className="fa fa-download" />
          Download Braille Embossing File(s)
          {this.renderLoading()}
        </a>
      );
    }

    return content;
  }
}
