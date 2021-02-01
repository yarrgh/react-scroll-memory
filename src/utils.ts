function _wr(type, eventType) {
  var orig = history[type];
  return function () {
    var rv = orig.apply(this, arguments);
    var e = new Event(eventType) as any;
    e.arguments = arguments;
    e.state = arguments[0];
    window.dispatchEvent(e);
    return rv;
  };
}

export const createHistoryEvents = (): void => {
  history.pushState = _wr("pushState", "pushstate");
  history.replaceState = _wr("replaceState", "replacestate");
};

export const getScrollPage = (): number => {
  let docScrollTop = 0;
  if (document.documentElement && document.documentElement !== null) {
    docScrollTop = document.documentElement.scrollTop;
  }
  return window.pageYOffset || docScrollTop;
};

export const getScrollElement = (elementId: string): number => {
  let elemScrollTop = 0;
  const element = document.getElementById(elementId);
  if (element !== null) {
    elemScrollTop = element.scrollTop;
  }
  return elemScrollTop;
};

export const scrollTo = (scrollnumber: number = 0): number =>
  window.requestAnimationFrame(() => {
    window.scrollTo(0, scrollnumber);
  });

export const scrollToElement = (
  scrollnumber: number = 0,
  elementId: string
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollTop = scrollnumber;
  }
};

export const isBrowser = (): boolean => typeof window !== "undefined";
