import { analytics } from './analytics';

interface PageViewEvent {
  path: string;
  title: string;
  referrer?: string;
}

interface UserEvent {
  eventName: string;
  properties?: Record<string, any>;
}

class EnhancedAnalytics {
  private static instance: EnhancedAnalytics;

  private constructor() {}

  public static getInstance(): EnhancedAnalytics {
    if (!EnhancedAnalytics.instance) {
      EnhancedAnalytics.instance = new EnhancedAnalytics();
    }
    return EnhancedAnalytics.instance;
  }

  // Track page views with enhanced data
  public trackPageView({ path, title, referrer }: PageViewEvent): void {
    analytics.track('page_view', {
      path,
      title,
      referrer,
      timestamp: new Date().toISOString(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      userAgent: navigator.userAgent,
    });
  }

  // Track user interactions
  public trackEvent({ eventName, properties = {} }: UserEvent): void {
    analytics.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId(),
    });
  }

  // Track user engagement time
  public startEngagementTimer(pageId: string): void {
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      analytics.track('page_engagement', {
        pageId,
        duration,
        timestamp: new Date().toISOString(),
      });
    });
  }

  // Get or create session ID
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
}

export const enhancedAnalytics = EnhancedAnalytics.getInstance();
