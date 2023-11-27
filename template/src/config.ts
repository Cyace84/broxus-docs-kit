export type NodeEnv = 'local' | 'dev' | 'prod';

export function getApiUrl(nodeEnv: NodeEnv) {
  return process.env.API_URL;
}
