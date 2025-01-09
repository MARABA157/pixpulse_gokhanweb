import mixpanel from 'mixpanel-browser';
import { getEnvironment } from '../../utils/environment';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

class AnalyticsService {
  private initialized: boolean = false;

  initialize() {
    if (MIXPANEL_TOKEN && !this.initialized) {
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: getEnvironment() !== 'production',
        track_pageview: true,
        persistence: 'localStorage',
      });
      this.initialized = true;
    }
  }

  trackPageView(pageName: string, properties?: Record<string, any>) {
    if (!this.initialized) return;
    
    mixpanel.track('Page View', {
      page: pageName,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.initialized) return;

    mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }

  trackNFTView(nftId: string, properties?: Record<string, any>) {
    this.trackEvent('NFT View', {
      nftId,
      ...properties,
    });
  }

  trackNFTInteraction(nftId: string, interactionType: 'like' | 'share' | 'bid' | 'buy', properties?: Record<string, any>) {
    this.trackEvent('NFT Interaction', {
      nftId,
      interactionType,
      ...properties,
    });
  }

  trackSearch(query: string, resultsCount: number, filters?: Record<string, any>) {
    this.trackEvent('Search', {
      query,
      resultsCount,
      filters,
    });
  }

  trackError(error: Error, context?: Record<string, any>) {
    this.trackEvent('Error', {
      message: error.message,
      stack: error.stack,
      ...context,
    });
  }

  setUserProperties(userId: string, properties: Record<string, any>) {
    if (!this.initialized) return;

    mixpanel.identify(userId);
    mixpanel.people.set({
      ...properties,
      $last_seen: new Date().toISOString(),
    });
  }

  startSession(userId: string) {
    if (!this.initialized) return;

    mixpanel.identify(userId);
    this.trackEvent('Session Start');
  }

  endSession() {
    if (!this.initialized) return;

    this.trackEvent('Session End');
    mixpanel.reset();
  }
}

export const analytics = new AnalyticsService();
