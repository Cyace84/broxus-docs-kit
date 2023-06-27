import { config } from 'dotenv';

export type NodeEnv = 'local' | 'dev' | 'prod';

export function getApiUrl(nodeEnv: NodeEnv) {
  config({ path: `.${nodeEnv}.env` });

  return process.env.API_URL;
}
