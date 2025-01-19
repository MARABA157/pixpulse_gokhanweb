export const environment = {
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL || '',
  supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || '',
  mixpanelToken: process.env.REACT_APP_MIXPANEL_TOKEN || '',
  sentryDsn: process.env.REACT_APP_SENTRY_DSN || '',
};
