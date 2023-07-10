import type { SyntheticsConfig } from '@elastic/synthetics';

export default env => {
  const config: SyntheticsConfig = {
    params: {
      devUrl: 'https://elastic.github.io/synthetics-demo/',
    },
    playwrightOptions: {
      ignoreHTTPSErrors: false,
    },
    /**
     * Configure global monitor settings
     */
    monitor: {
      schedule: 5,
      locations: [],
      privateLocations: ['Test private location'],
    },
    /**
     * Project monitors settings
     */
    project: {
      id: 'test-projects',
      url: 'https://localhost:5601/',
      space: 'default',
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
