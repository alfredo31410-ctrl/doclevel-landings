import { useEffect } from "react";

import { resolveRoute } from "./routes";
import {
  captureEnarmAttribution,
  trackRoutePageView,
} from "../landings/ENARM/tracking";

export function App() {
  const route = resolveRoute(window.location.pathname);
  const Page = route.page;

  useEffect(() => {
    trackRoutePageView(route.trackingPath);

    if (route.captureEnarmAttribution) {
      captureEnarmAttribution(window.location.search);
    }
  }, [route.captureEnarmAttribution, route.trackingPath]);

  return <Page />;
}
