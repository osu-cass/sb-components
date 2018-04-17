import {
  SearchAPIParamsModel,
  SearchUrl,
  GradeLevels,
  GradeLevel,
  FilterType,
  parseQueryString
} from "@src/index";

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
      // tslint:disable-next-line:no-bitwise
      gradeLevels: GradeLevels.Grade6 | GradeLevels.Grade8
    };
    const encoded = SearchUrl.encodeQuery(searchParams);

    expect(encoded).toEqual("?Grade=40");
  });

  it("encodes with only targets", () => {
    const searchParams: SearchAPIParamsModel = {
      targets: ["1234", "4321"]
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

  it("encodes calc on", () => {
    const searchParams: SearchAPIParamsModel = {
      calculator: true
    };
    const encoded = SearchUrl.encodeQuery(searchParams);
    const expected = `?${FilterType.Calculator.toString()}=true`;

    expect(encoded).toEqual(expected);
  });

  it("encodes calc off", () => {
    const searchParams: SearchAPIParamsModel = {
      calculator: false
    };
    const encoded = SearchUrl.encodeQuery(searchParams);
    const expected = `?${FilterType.Calculator.toString()}=false`;

    expect(encoded).toEqual(expected);
  });

  it("encodes multiple params", () => {
    const searchParams: SearchAPIParamsModel = {
      subjects: ["MATH"],
      gradeLevels: GradeLevels.Grade5,
      targets: ["1234", "5678"],
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

    expect(decoded).toEqual({});
  });

  it("decodes claims only", () => {
    const decoded = SearchUrl.decodeSearch("?Claim=test,test2");

    expect(decoded).toEqual({
      claims: ["test", "test2"]
    });
  });

  it("decodes subjects only", () => {
    const decoded = SearchUrl.decodeSearch("?Subject=s,s2");

    expect(decoded).toEqual({
      subjects: ["s", "s2"]
    });
  });

  it("decodes interaction types only", () => {
    const decoded = SearchUrl.decodeSearch("?InteractionType=it,it2");

    expect(decoded).toEqual({
      interactionTypes: ["it", "it2"]
    });
  });

  it("decodes grade level only", () => {
    const decoded = SearchUrl.decodeSearch("?Grade=4");

    expect(decoded).toEqual({
      gradeLevels: GradeLevels.Grade5
    });
  });

  it("decodes targets only", () => {
    const decoded = SearchUrl.decodeSearch("?Target=1234,4321");

    expect(decoded).toEqual({
      targets: ["1234", "4321"]
    });
  });

  it("decodes CAT types only", () => {
    const decoded = SearchUrl.decodeSearch("?CAT=true");

    expect(decoded).toEqual({
      catOnly: true
    });
  });

  it("decodes performance types only", () => {
    const decoded = SearchUrl.decodeSearch("?Performance=true");

    expect(decoded).toEqual({
      performanceOnly: true
    });
  });

  it("decodes multiple params", () => {
    const decoded = SearchUrl.decodeSearch(
      "?Claim=MATH1,MATH2&Subject=MATH&Grade=4&Target=1234,5678&CAT=true"
    );

    expect(decoded).toEqual({
      subjects: ["MATH"],
      gradeLevels: GradeLevels.Grade5,
      targets: ["1234", "5678"],
      claims: ["MATH1", "MATH2"],
      catOnly: true
    });
  });
});

describe("SearchUrl.decodeExpressQuery", () => {
  it("decodes empty object", () => {
    const decoded = SearchUrl.decodeExpressQuery({});

    expect(decoded).toEqual({});
  });

  it("decodes grades only", () => {
    const query = {
      Grade: "4"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      gradeLevels: GradeLevels.Grade5
    });
  });

  it("decodes claims only", () => {
    const query = {
      Claim: "test,test2"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      claims: ["test", "test2"]
    });
  });

  it("decodes subjects only", () => {
    const query = {
      Subject: "MATH,ELA"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      subjects: ["MATH", "ELA"]
    });
  });

  it("decodes interaction type only", () => {
    const query = {
      InteractionType: "1,2"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      interactionTypes: ["1", "2"]
    });
  });

  it("decodes target only", () => {
    const query = {
      Target: "1234,2468"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      targets: ["1234", "2468"]
    });
  });

  it("decodes performance type only", () => {
    const query = {
      Performance: "true"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      performanceOnly: true
    });
  });

  it("decodes CAT type only", () => {
    const query = {
      CAT: "true"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      catOnly: true
    });
  });

  it("decodes multiple params", () => {
    const query = {
      CAT: "true",
      Subject: "MATH,ELA",
      Claim: "MATH1,2,3",
      Target: "1,2,3",
      Grade: "2"
    };
    const decoded = SearchUrl.decodeExpressQuery(query);

    expect(decoded).toEqual({
      catOnly: true,
      subjects: ["MATH", "ELA"],
      claims: ["MATH1", "2", "3"],
      targets: ["1", "2", "3"],
      gradeLevels: GradeLevels.Grade4
    });
  });
});
