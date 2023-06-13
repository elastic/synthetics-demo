import type { SyntheticsConfig } from "@elastic/synthetics";

export default (env) => {
  const config: SyntheticsConfig = {
    params: {
      url: "https://elastic.github.io/synthetics-demo/",
    },
    playwrightOptions: {
      ignoreHTTPSErrors: false,
    },
    /**
     * Configure global monitor settings
     */
    monitor: {
      schedule: 10,
      locations: ["germany", "us_east"],
      privateLocations: [""],
    },
    /**
     * Project monitors settings
     */
    project: {
      id: "project-monitors-demo",
      url: "https://project-monitors-demo.kb.us-central1.gcp.cloud.es.io:9243/",
      space: "default",
    },
  };
  if (env !== "development") {
    /**
     * Override configuration specific to environment
     * Ex: config.params.url = ''
     */
  }
  return config;
};
