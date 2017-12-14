import { SearchAPIParamsModel } from "../ItemSearchModels";
import { SearchUrl } from "../SearchUrl";
import { GradeLevels, GradeLevel } from "../../GradeLevels/GradeLevels";
import { FilterType } from "../../Filter/FilterModels";

describe("SearchUrl.encodeQuery", () => {
  it("works for empty object", () => {
    const empty: SearchAPIParamsModel = {};
    const encoded = SearchUrl.encodeQuery(empty);

    expect(encoded).toEqual("");
  });

  it("encodes with only claims", () => {
    const searchParams: SearchAPIParamsModel = {
      claims: ["test", "test2"]
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?Claim=test,test2");
  });

  it("encodes with only subjects", () => {
    const searchParams: SearchAPIParamsModel = {
      subjects: ["s", "s2"]
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?Subject=s,s2");
  });

  it("encodes with only interaction types", () => {
    const searchParams: SearchAPIParamsModel = {
      interactionTypes: ["it", "it2"]
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?InteractionType=it,it2");
  });

  it("encodes with only grade levels", () => {
    const searchParams: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Grade6 | GradeLevels.Grade8
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?Grade=40");
  });

  it("encodes with only targets", () => {
    const searchParams: SearchAPIParamsModel = {
      targets: [1234, 4321]
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?Target=1234,4321");
  });

  it("encodes performance task", () => {
    const searchParams: SearchAPIParamsModel = {
      performanceOnly: true
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?Performance=true");
  });

  it("encodes CAT type", () => {
    const searchParams: SearchAPIParamsModel = {
      catOnly: true
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?CAT=true");
  });

  it("encodes multiple params", () => {
    const searchParams: SearchAPIParamsModel = {
      subjects: ["MATH"],
      gradeLevels: GradeLevels.Grade5,
      targets: [1234, 5678],
      claims: ["MATH1", "MATH2"],
      catOnly: true
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual(
      "?Claim=MATH1,MATH2&Subject=MATH&Grade=4&Target=1234,5678&CAT=true"
    );
  });
});

describe("SearchUrl.encodeFilter", () => {
  it("works with no options", () => {
    const encoded = SearchUrl.encodeFilter(FilterType.Claim, []);

    expect(encoded).toEqual("Claim=");
  });

  it("works with one option", () => {
    const encoded = SearchUrl.encodeFilter(FilterType.Claim, ["MATH1"]);

    expect(encoded).toEqual("Claim=MATH1");
  });

  it("works with multiple options", () => {
    const encoded = SearchUrl.encodeFilter(FilterType.Claim, ["MATH1", "ELA1"]);

    expect(encoded).toEqual("Claim=MATH1,ELA1");
  });
});

describe("SearchUrl.decodeSearch", () => {
  it("decodes empty string", () => {
    const decoded = SearchUrl.decodeSearch("");

    expect(decoded).toMatchObject({});
  });

  it("decodes claims only", () => {
    const decoded = SearchUrl.decodeSearch("?Claim=test,test2");

    expect(decoded).toMatchObject({
      claims: ["test", "test2"]
    });
  });

  it("decodes subjects only", () => {
    const decoded = SearchUrl.decodeSearch("?Subject=s,s2");

    expect(decoded).toMatchObject({
      subjects: ["s", "s2"]
    });
  });

  it("decodes interaction types only", () => {
    const decoded = SearchUrl.decodeSearch("?InteractionType=it,it2");

    expect(decoded).toMatchObject({
      interactionTypes: ["it", "it2"]
    });
  });

  it("decodes grade level only", () => {
    const decoded = SearchUrl.decodeSearch("?Grade=4");

    expect(decoded).toMatchObject({
      gradeLevels: GradeLevels.Grade5
    });
  });

  it("decodes targets only", () => {
    const decoded = SearchUrl.decodeSearch("?Target=1234,4321");

    expect(decoded).toMatchObject({
      targets: [1234, 4321]
    });
  });

  it("decodes CAT types only", () => {
    const decoded = SearchUrl.decodeSearch("?CAT=true");

    expect(decoded).toMatchObject({
      catOnly: true
    });
  });

  it("decodes performance types only", () => {
    const decoded = SearchUrl.decodeSearch("?Performance=true");

    expect(decoded).toMatchObject({
      performanceOnly: true
    });
  });

  it("decodes multiple params", () => {
    const decoded = SearchUrl.decodeSearch(
      "?Claim=MATH1,MATH2&Subject=MATH&Grade=4&Target=1234,5678&CAT=true"
    );

    expect(decoded).toMatchObject({
      subjects: ["MATH"],
      gradeLevels: GradeLevels.Grade5,
      targets: [1234, 5678],
      claims: ["MATH1", "MATH2"],
      catOnly: true
    });
  });
});
