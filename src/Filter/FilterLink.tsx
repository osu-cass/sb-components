import * as React from "react";

/**
 * The filterId is an element id that refers to the id of the Filter
 * element on the DOM
 * @interface FilterLinkProps
 * @member {string} filterId
 */
export interface FilterLinkProps {
  filterId: string;
}

/**
 * A link button that is fixed to the bottom of the screen that navigates to the
 * filter on the DOM.
 * @function FilterLink
 */
export const FilterLink: React.SFC<FilterLinkProps> = ({ filterId }) => {
  return (
    <a className=" filter-jump-link btn btn-blue" role="button" href={filterId}>
      Jump to Filter
    </a>
  );
};
