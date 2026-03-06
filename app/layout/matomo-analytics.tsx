"use client";

import { trackAppRouter } from "@socialgouv/matomo-next";
import {ReadonlyURLSearchParams, usePathname, useSearchParams} from "next/navigation";
import { useEffect } from "react";

const MATOMO_URL = "https://analytics.hthompson.dev/";
const MATOMO_SITE_ID = "2";

export function MatomoAnalytics() {
  const pathname: string = usePathname();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  useEffect(() => {
    trackAppRouter({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
      pathname,
      searchParams,
      enableHeartBeatTimer: true,
    });
  }, [pathname, searchParams]);

  return null;
}
