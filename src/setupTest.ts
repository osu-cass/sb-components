import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as moment from "moment";

// tslint:disable-next-line:no-any
(enzyme as any).configure({ adapter: new Adapter() });

jest.mock("moment", () => () => ({
  format: () => "2018–01–30T12:34:56+00:00"
}));
