import { getApiUrl } from './../config';

interface Pages {
  [id: string]: ApiRefPage;
}

export interface ApiRefPage {
  name: string;
  tableOfContent?: string;
  content: string;
  colNum?: number;
}

export interface ApiReferenceResponse {
  pagesHtml: Pages;
}

export async function getApiReference(
  projectName: string,
  targetPageName: string,
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  nodeEnv: string = 'prod'
): Promise<ApiRefPage | undefined> {
  const url = `${getApiUrl(nodeEnv)}?projectName=${encodeURIComponent(projectName)}`;

  const findPageByName = (pages: ApiRefPage[], pageName: string): ApiRefPage | undefined => {
    return pages.find(page => page.name === pageName);
  };

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ApiReferenceResponse = await response.json();
    const pages: ApiRefPage[] = Object.values(data.pagesHtml);

    return findPageByName(pages, targetPageName);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('There has been a problem with your fetch operation:', error);

    return undefined;
  }
}
