import { CoreV1Api, KubeConfig, V1Service } from '@kubernetes/client-node';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

// Load the Kubernetes configuration
const kubeConfig = new KubeConfig();
kubeConfig.loadFromDefault();

// Create the Kubernetes API client
const coreApi = kubeConfig.makeApiClient(CoreV1Api);

let services: V1Service[] = [];

// Function to fetch the list of services and update the 'services' variable
async function updateServices() {
  console.log('Updating services...');
  try {
    // Fetch the list of services
    const { body } = await coreApi.listServiceForAllNamespaces();

    // Update the 'services' variable with the new list of services
    services = body.items;

    const monitors: Monitor[] = [];
    for (const service of services) {
      // annotation example

      const annotations = service.metadata?.annotations;
      const prefix = 'co.elastic.monitor';
      if (annotations) {
        const monitor = mergeAnnotations(annotations);
        if (monitor.type === 'tcp') {
          monitor.hosts = monitor.urls;
          delete monitor.urls;
        }
        if (monitor.id && monitor.name) {
          monitors.push(monitor);
        }
      }
    }

    // Store the services in a YAML file
    const yamlData = yaml.dump({ 'heartbeat.monitors': monitors });
    fs.writeFileSync('lightweight/services.yaml', yamlData, 'utf8');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Set an initial delay and interval (in milliseconds) for updating the services
const initialDelay = 0; // Start updating immediately

// Update the services initially and then periodically
setTimeout(() => {
  updateServices();
}, initialDelay);

interface Monitor {
  tags?: string[];
  id: string;
  name: string;
  schedule: string;
  type: string;
  urls: string;
  hosts?: string;
  timeout: string;
  'check.response.status': number[] | number | string | string[];
  'ssl.verification_mode'?: string;
}

const mergeAnnotations = (annotations: any) => {
  const transformedObject: Record<string, any> = {};
  const prefix = 'co.elastic.monitor/';
  for (const key in annotations) {
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, '');
      transformedObject[newKey] = annotations[key];
    }
  }
  const multiKeys = Object.keys(transformedObject).filter(key =>
    key.startsWith('check.response.status')
  );
  if (multiKeys.length > 0) {
    transformedObject['check.response.status'] = multiKeys.map(
      key => transformedObject[key]
    );
  }

  const finalObject = {
    'check.response.status': transformedObject['check.response.status'],
    id: transformedObject.id,
    name: transformedObject.name,
    schedule: transformedObject.schedule,
    type: transformedObject.type,
    urls: transformedObject.urls,
    'ssl.verification_mode': transformedObject['ssl.verification_mode'],
    tags: [...(transformedObject.tags ?? []), 'kubernetes'],
  };
  return finalObject as Monitor;
};
