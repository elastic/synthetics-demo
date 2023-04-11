import type { SyntheticsConfig } from '@elastic/synthetics';

export default env => {
  const config: SyntheticsConfig = {
    params: {
      url: 'https://elastic.github.io/synthetics-demo/',
    },
    playwrightOptions: {
      ignoreHTTPSErrors: false,
    },
    /**
     * Configure global monitor settings
     */
    monitor: {
      schedule: 10,
      locations: ['germany','us_east'],
      privateLocations: [''],
    },
    /**
     * Project monitors settings
     */
    project: {
      id: 'cloud-demo',
      url: 'https://berlin-meetup-8-8-prod.kb.us-west2.gcp.elastic-cloud.com:9243/',
      space: 'push-cloud',
    },
  };
  if (env !== 'development') {
    /**
     * Override configuration specific to environment
     * Ex: config.params.url = ""
     */
  }
  return config;
};
