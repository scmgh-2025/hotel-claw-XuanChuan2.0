export type RoleType = 'guest' | 'front_desk' | 'housekeeping' | 'marketing' | 'manager' | 'owner';

export interface PainPoint {
  id: string;
  role: RoleType;
  roleName: string;
  roleDesc: string;
  avatar: string;
  title: string;
  problems: {
    scenarios: string;
    consequences: string;
  }[];
  afterAI: {
    scenarios: string;
    metrics: string;
  }[];
  caseStudy: string;
}

export interface LifecycleItem {
  title: string;
  desc: string;
}

export interface LifecycleStage {
  id: number;
  phase: string;
  title: string;
  problems: LifecycleItem[];
  changes: LifecycleItem[];
  valueGuest: string;
  valueHotel: string;
}

export interface ModelCard {
  category: string;
  count: number;
  iconName: string;
  examples: string[];
}

export interface ArchLayer {
  level: string;
  name: string;
  translation: string;
  items: string[];
}

export interface OnboardingStep {
  step: number;
  title: string;
  desc: string;
  duration: string;
}

export interface PartnerHotel {
  name: string;
  type: string;
  tag: string;
  image: string;
}

export interface RoleDomain {
  id: number;
  name: string;
  desc: string;
  currentSituation: string[];
  aiValue: string[];
  roleValue: string;
  images?: string[];
  modelRefs: string;
}
