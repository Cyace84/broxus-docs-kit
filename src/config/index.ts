export type NodeEnv = 'local' | 'dev' | 'prod';

export function getApiUrl(nodeEnv: NodeEnv) {
  if (nodeEnv === 'local') {
    return 'https://creaitive.cloud/api/v1/get/api-reference';
  } else {
    return 'http://localhost:3000/api/v1/get/api-reference';
  }
}
