import { onCLS, onFID, onLCP } from 'web-vitals';
import mixpanel from 'mixpanel-browser';
import { environment } from './environment';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
  }
};

const analytics = {
  init() {
    if (environment.mixpanelToken) {
      mixpanel.init(environment.mixpanelToken);
    }
  },

  identify(userId: string, traits?: Record<string, any>) {
    if (environment.mixpanelToken) {
      mixpanel.identify(userId);
      if (traits) {
        mixpanel.people.set(traits);
      }
    }
  },

  track(event: string, properties?: Record<string, any>) {
    if (environment.mixpanelToken) {
      mixpanel.track(event, properties);
    }
  },

  page(name: string, properties?: Record<string, any>) {
    if (environment.mixpanelToken) {
      mixpanel.track('Page Viewed', {
        page: name,
        ...properties,
      });
    }
  },
};

export { reportWebVitals, analytics };
