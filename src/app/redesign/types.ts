export type RedesignFormData = {
  company_url: string;
  email: string;
  growth_bottleneck: string;
  budget: string;
}

export enum RedesignStep {
  INTRO = 'intro',
  URL_EMAIL = 'url_email',
  BOTTLENECK = 'bottleneck',
  BUDGET = 'budget',
  CALENDAR = 'calendar'
}
