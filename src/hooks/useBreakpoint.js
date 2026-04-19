import { useLayoutEffect, useState } from "react";

const BREAKPOINT = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 };

// const BREAKPOINT_MAX_WIDTH = {
//   xs: BREAKPOINT.sm - 0.02,
//   sm: BREAKPOINT.md - 0.02,
//   md: BREAKPOINT.lg - 0.02,
//   lg: BREAKPOINT.xl - 0.02,
//   xl: BREAKPOINT.xxl - 0.02,
// };

function checkMatches(mqls) {
  return {
    xs: mqls.xs.matches,
    sm: mqls.sm.matches,
    md: mqls.md.matches,
    lg: mqls.lg.matches,
    xl: mqls.xl.matches,
    xxl: mqls.xxl.matches,
  };
}

const useBreakpoint = () => {
  const getInitialScreens = () => {
    if (typeof window === "undefined") {
      return {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
      };
    }
    const mqls = {
      xs: window.matchMedia(`(min-width:${BREAKPOINT.xs}px)`),
      sm: window.matchMedia(`(min-width:${BREAKPOINT.sm}px)`),
      md: window.matchMedia(`(min-width:${BREAKPOINT.md}px)`),
      lg: window.matchMedia(`(min-width:${BREAKPOINT.lg}px)`),
      xl: window.matchMedia(`(min-width:${BREAKPOINT.xl}px)`),
      xxl: window.matchMedia(`(min-width:${BREAKPOINT.xxl}px)`),
    };
    return checkMatches(mqls);
  };

  const [screens, setScreens] = useState(getInitialScreens());

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const MEDIA_QUERY_LISTS = {
      xs: window.matchMedia(`(min-width:${BREAKPOINT.xs}px)`),
      sm: window.matchMedia(`(min-width:${BREAKPOINT?.sm}px)`),
      md: window.matchMedia(`(min-width:${BREAKPOINT?.md}px)`),
      lg: window.matchMedia(`(min-width:${BREAKPOINT?.lg}px)`),
      xl: window.matchMedia(`(min-width:${BREAKPOINT?.xl}px)`),
      xxl: window.matchMedia(`(min-width:${BREAKPOINT?.xxl}px)`),
    };

    const onChange = () => setScreens(checkMatches(MEDIA_QUERY_LISTS));

    onChange();

    Object.values(MEDIA_QUERY_LISTS).forEach((m) => {
      m?.addEventListener("change", onChange);
    });
    return () =>
      Object.values(MEDIA_QUERY_LISTS).forEach((m) => {
        m?.removeEventListener("change", onChange);
      });
  }, []);

  return {
    xs: screens.xs && !screens.sm,
    sm: screens.sm && !screens.md,
    md: screens.md && !screens.lg,
    lg: screens.lg && !screens.xl,
    xl: screens.xl && !screens.xxl,
    xxl: screens.xxl,
  };
};

export default useBreakpoint;
