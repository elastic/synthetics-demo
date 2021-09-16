import { SyntheticsConfig } from "@elastic/synthetics"

const config: SyntheticsConfig = {
  // The default port of the webserver in `hooks.journey.ts` is 8080
  // You can override this with the --params argument
  params: {
    url: "http://localhost:8080"
  }
}

export default config;