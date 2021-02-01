import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  isBrowser,
  scrollToElement,
  scrollTo,
  getScrollElement,
  getScrollPage,
  createHistoryEvents,
} from "./utils";

interface ScrollProps {
  elementId?: string;
}

const url = new Map<string, number>();

const ScrollMemory: React.FC<ScrollProps> = ({ elementId }) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    setPrevLocation(location);
  }, [location]);

  const detectPop = (loc: PopStateEvent) => {
    const key = loc.state?.key ?? "enter";
    const nextFind = url.get(key) || 0;

    elementId ? scrollToElement(nextFind, elementId) : scrollTo(nextFind);
  };

  const detectPush = (loc: PopStateEvent) => {
    const scroll = elementId ? getScrollElement(elementId) : getScrollPage();
    const { state }: any = prevLocation;
    const key = state?.key || "enter";

    elementId ? scrollToElement(0, elementId) : scrollTo(0);

    url.set(key, scroll);
  };

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    createHistoryEvents();
    window.addEventListener("popstate", detectPop);
    window.addEventListener("pushstate", detectPush);

    return () => {
      window.removeEventListener("popstate", detectPop);
      window.removeEventListener("pushstate", detectPush);
    };
  }, []);

  return null;
};

export default ScrollMemory;
