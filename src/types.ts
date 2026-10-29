export type NavigationPage = 
  | 'home' 
  | 'services' 
  | 'industries' 
  | 'estimator' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'notfound';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  problemsSolved: string[];
  quotationRequirements: string;
  codeSample?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
}

export interface IndustryItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image?: string;
  painPoints: string[];
  keyModules: string[];
  architecturalSolution: string;
}

export interface EstimatorState {
  teamSize: string;
  deploymentTarget: string;
  odooEdition: string;
  selectedModules: string[];
  customNeeds: string[];
  timeline: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  odooVersion: string;
  service: string;
  timeline: string;
  message: string;
  consent: boolean;
}
