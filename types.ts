// Enum for application stages
export enum AppStage {
  Manifesto = 'manifesto',
  Questionnaire = 'questionnaire',
  PracticalTest = 'practical_test',
  Results = 'results',
}

// Enums for cultural framework
export enum CulturalPillar {
  BrandMindset = 'Mentalidade de Marca',
  PerformanceObsessed = 'Obcecada por Performance',
  ExecutableCreativity = 'Criatividade Executável',
  SpeedAndLearning = 'Velocidade e Aprendizado',
  Ownership = 'Ownership',
  Consistency = 'Consistência',
}

export enum AntiFitTrait {
  MetricsDisregard = 'Desprezo por métricas',
  ProfessionalVictimhood = 'Vitimismo profissional',
  CreativeEgo = 'Ego criativo',
  LowAdaptability = 'Baixa adaptabilidade',
  ConstantValidationDependency = 'Dependência de validação constante',
}

// Enums for job roles
export enum JobRole {
  SocialMedia = 'Social Media',
  Copywriter = 'Copywriter',
  TrafficManager = 'Gestor de Tráfego',
  Designer = 'Designer',
  MarketingAnalyst = 'Analista de Marketing',
  DigitalStrategist = 'Estrategista Digital',
}

// Interfaces for questions
export interface BaseQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea';
  placeholder?: string;
}

export interface CulturalFitModuleQuestion extends BaseQuestion {
  module: 'cultural-fit';
}

export interface DigitalMarketingModuleQuestion extends BaseQuestion {
  module: 'digital-marketing';
}

export interface PracticalTestModuleQuestion extends BaseQuestion {
  module: 'practical-test';
}

export type Question = CulturalFitModuleQuestion | DigitalMarketingModuleQuestion | PracticalTestModuleQuestion;

// Interface for candidate answers
export interface CandidateAnswers {
  [questionId: string]: string;
}

// Enum for score classification
export enum ScoreClassification {
  Failed = 'Reprovado',
  TalentPool = 'Banco de Talentos',
  Interview = 'Entrevista',
  HighPriority = 'Alta Prioridade',
}

// Interface for AI evaluation result
export interface EvaluationResult {
  score: number;
  classification: ScoreClassification;
  strengths: string[];
  redFlags: string[];
  summary: string;
  culturalRisks: string;
  recommendation: string;
}
