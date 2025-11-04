export type StaticContentType = 'terms_of_service' | 'privacy_policy' | 'faq';

export interface StaticContent {
  id: string;
  type: StaticContentType;
  title: string;
  content: string;
  lastUpdated: Date;
  updatedBy: string;
  version: number;
  isPublished: boolean;
}

export interface StaticContentInput {
  type: StaticContentType;
  title: string;
  content: string;
  isPublished: boolean;
}
