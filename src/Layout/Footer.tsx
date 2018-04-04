import * as React from "react";
import { IframeModal } from "@src/index";

const privacyUrl = "http://smarterbalanced.org/privacy-policy";

// tslint:disable-next-line:variable-name
export const Footer: React.SFC<{}> = props => {
  return (
    <footer className="footer-container" role="contentinfo">
      <div className="footer-content container">
        <a
          className="footer-sbLink footer-practiceTests"
          href="http://practice.smarterbalanced.org/"
        >
          Practice and training tests are available here.
        </a>
        <div className="footer-copyright">
          <p>
            &copy; The Regents of the University of California – Smarter
            Balanced Assessment Consortium
          </p>
          <a className="footer-sbLink" href="//www.smarterbalanced.org">
            www.SmarterBalanced.org
          </a>
          <div>
            <IframeModal
              url={privacyUrl}
              title="Website Privacy Policy"
              btnText="Website Privacy Policy"
              btnClass="btn btn-link btn-sm footer-sbLink"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
