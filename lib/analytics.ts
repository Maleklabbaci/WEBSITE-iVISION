type AnalyticsValue = string | number | boolean;

type AnalyticsParams = Record<string, AnalyticsValue>;

export function trackEvent(action: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;

  const gtag = (window as Window & {
    gtag?: (command: 'event', eventName: string, eventParams?: AnalyticsParams) => void;
  }).gtag;

  gtag?.('event', action, params);
}
