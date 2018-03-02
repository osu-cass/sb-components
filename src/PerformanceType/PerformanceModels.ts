function readCookie(name: string): string | undefined {
  const cookie = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);

  return cookie ? cookie.pop() : "";
}

export function shouldShowOnLoad(
  isPerformance: boolean,
  subject: string
): boolean {
  let visitedBefore = false;
  let shouldShow = false;

  if (isPerformance) {
    if (subject.toLowerCase() === "math") {
      visitedBefore = readCookie("visitedMathPerfItem") === "true";
      document.cookie = "visitedMathPerfItem=true";
    } else if (subject.toLowerCase() === "ela") {
      visitedBefore = readCookie("visitedELAPerfItem") === "true";
      document.cookie = "visitedELAPerfItem=true";
    }

    if (!visitedBefore) {
      shouldShow = true;
    }
  }

  return shouldShow;
}

export function getSubjectText(subject: string): string {
  switch (subject.toLowerCase()) {
    case "math":
      return "Math";
    case "ela":
      return "ELA";
    default:
      return "";
  }
}

export function getSubjectHeader(subject: string): string {
  switch (subject.toLowerCase()) {
    case "math":
      return "Note about Math Performance Task Items";
    case "ela":
      return "Note about ELA Performance Task Items";
    default:
      return "";
  }
}
