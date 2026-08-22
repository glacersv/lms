// Types system definition for Campus Salesiano San José

export type SystemModuleId =
  | 'formacion'
  | 'notas'
  | 'clase'
  | 'horario'
  | 'eventos'
  | 'avisos'
  | 'proyectos'
  | 'semana-juventud'
  | 'semana-juventud-admin'
  | 'lms'; // MODIFICADO: Módulo LMS Aula Virtual

export interface SystemModuleConfig {
  id: SystemModuleId;
  label: string;
  desc: string;
  iconName?: string;
  color?: string;
}

export const SYSTEM_MODULES: { id: SystemModuleId; label: string; desc: string }[] = [
  { id: 'lms', label: 'Mi Aula Virtual', desc: 'Cursos, actividades y calificaciones' }, // MODIFICADO
  { id: 'formacion', label: 'Formación Buenos Días', desc: 'Registro de asistencia y disciplina' },
  { id: 'notas', label: 'Notas', desc: 'Calificaciones y evaluaciones' },
  { id: 'clase', label: 'Clase', desc: 'Control de clases del día' },
  { id: 'horario', label: 'Horarios', desc: 'Horarios de clases' },
  { id: 'eventos', label: 'Eventos', desc: 'Eventos del colegio' },
  { id: 'avisos', label: 'Avisos', desc: 'Comunicados y anuncios' },
  { id: 'proyectos', label: 'Semana de la Juventud', desc: 'Gestión de proyectos estudiantiles' },
  { id: 'semana-juventud', label: 'Mi Proyecto', desc: 'Ver estado de mi proyecto' },
  { id: 'semana-juventud-admin', label: 'Semana de la Juventud', desc: 'Administrar proyectos estudiantiles' },
];

export const ROLE_LABELS_BASE: Record<string, string> = {
  alumno: 'Estudiante',
  docente: 'Docente',
  admin: 'Administrador General',
  coordinador: 'Coordinador',
};

// ==========================================
// LMS DOMAIN TYPES (Firestore / Shared State)
// ==========================================

export type TechnicalYear = '1' | '2' | '3'; // 1° Año (720h), 2° Año (720h), 3° Año (1200h)
export type ActionStageKey = 'informar' | 'planificar' | 'decidir' | 'ejecutar' | 'controlar' | 'valorar';

export type ActivityType = 'rubric' | 'evaluated' | 'delivery' | 'quiz' | 'proyecto';
export type ActivityStatus = 'pendiente' | 'entregada' | 'calificada' | 'vencida';
export type CourseStatus = 'active' | 'upcoming' | 'finished';

// MINED Competency Achievement Levels (Escala 1 al 5 Oficial MINED)
export type MinedLevel = 1 | 2 | 3 | 4 | 5;

export interface MinedLevelDefinition {
  level: MinedLevel;
  label: string;
  description: string;
  gradeEquivalent: number; // e.g., 1->3.0, 2->5.5, 3->6.5, 4->8.5, 5->10.0
  gradeRange: string;
  approved: boolean; // level >= 4
}

export const MINED_LEVELS: Record<MinedLevel, MinedLevelDefinition> = {
  1: {
    level: 1,
    label: 'Nivel 1 — Con mucha ayuda',
    description: 'Realiza la actividad de trabajo y aprendizaje con mucha ayuda.',
    gradeEquivalent: 4.0,
    gradeRange: '1.0 - 4.9',
    approved: false,
  },
  2: {
    level: 2,
    label: 'Nivel 2 — Con poca ayuda',
    description: 'Realiza la actividad de trabajo y aprendizaje con poca ayuda.',
    gradeEquivalent: 5.5,
    gradeRange: '5.0 - 5.9',
    approved: false,
  },
  3: {
    level: 3,
    label: 'Nivel 3 — Con eventual ayuda',
    description: 'Realiza la actividad de trabajo y aprendizaje con eventual ayuda.',
    gradeEquivalent: 6.5,
    gradeRange: '6.0 - 6.9',
    approved: false,
  },
  4: {
    level: 4,
    label: 'Nivel 4 — Por sí mismo(a) (Aprobado)',
    description: 'Realiza la actividad de trabajo y aprendizaje por sí mismo(a). Nivel mínimo de aprobación.',
    gradeEquivalent: 8.5,
    gradeRange: '7.0 - 8.9',
    approved: true,
  },
  5: {
    level: 5,
    label: 'Nivel 5 — Por sí mismo(a) y ayuda a otros',
    description: 'Realiza la actividad de trabajo y aprendizaje por sí mismo(a) y ayuda a otros(as).',
    gradeEquivalent: 10.0,
    gradeRange: '9.0 - 10.0',
    approved: true,
  },
};

// 4 Ejes de Desarrollo de la Competencia Oficial MINED
export interface CompetenceDevelopmentAxes {
  desarrolloTecnico: string;
  desarrolloEmprendedor: string;
  desarrolloHumanoSocial: string;
  desarrolloAcademicoAplicado: string;
}

// 6 Etapas de la Acción Completa
export interface ActionStageDetail {
  key: ActionStageKey;
  title: string;
  hoursPercentage: number; // e.g. 10%, 25%, 20%
  guidingQuestions: string[];
  studentTasks: string[];
  teacherTasks: string[];
  suggestedTools: string[];
}

export interface SaberItem {
  id: string;
  description: string;
  appreciation?: 'MUCHO' | 'POCO' | 'NADA'; // Para saberes previos
}

export interface ProjectBrief {
  id: string;
  academicYear: string; // e.g. '2025', '2026', '2027'
  title: string;
  theme: string;
  targetClient: string; // e.g. "Microempresa de café artesanal de Juayúa"
  problemStatement: string;
  creativeBrief: string;
  deliverables: string[];
  suggestedSoftware: string[];
  materialsRequired: string[];
  status: 'active' | 'archived' | 'draft';
}

export interface TechnicalModuleDescriptor {
  code: string; // e.g. 'BTVDG1.3'
  year: TechnicalYear;
  title: string;
  hours: number;
  weeks: number;
  prerequisite: string;
  field: string;
  specialty: string;
  affineArea: 'Estrategias conceptuales y artísticas' | 'Diseño y diagramación' | 'Publicidad y comunicación' | 'Producción' | 'Emprendedurismo' | 'Orientación';
  competenceGeneral: string;
  moduleObjective: string;
  problematicSituation: {
    cause: string;
    situation: string;
    effect: string;
    summary: string;
  };
  evaluationCriteria: string[];
  promotionCriteria: string; // "Comprobar haber alcanzado el nivel 4"
  developmentAxes: CompetenceDevelopmentAxes;
  actionStages: Record<ActionStageKey, ActionStageDetail>;
  saberesPrevios: SaberItem[];
  saberesNecesarios: SaberItem[];
  currentProject: ProjectBrief;
  availableProjects: ProjectBrief[];
  resources: {
    materials: string[];
    equipment: string[];
    furniture: string[];
    safety: string[];
  };
  bibliography: {
    books: string[];
    magazines?: string[];
    websites?: string[];
  };
}

export interface RubricCriterionLevel {
  score: number; // e.g. 1 to 5 (MinedLevel)
  label: string;
  description: string;
}

export interface RubricCriterion {
  id: string;
  title: string;
  axis?: 'tecnico' | 'emprendedor' | 'humanoSocial' | 'academico';
  weight: number; // percentage weight, e.g. 25%
  levels: RubricCriterionLevel[];
}

export interface Rubric {
  id: string;
  title: string;
  description?: string;
  criteria: RubricCriterion[];
}

export interface LMSCourse {
  id: string;
  name: string;
  code: string;
  technicalYear: TechnicalYear;
  hours: number;
  weeks: number;
  affineArea: string;
  description: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  gradeId: string;
  gradeName: string;
  sectionId: string;
  sectionName: string;
  subjectId: string;
  icon: string;
  color: string;
  status: CourseStatus;
  schedule?: string;
  classroom?: string;
  unitsCount: number;
  activitiesCount: number;
  progress?: number; // Calculated student progress 0-100
  averageGrade?: number; // Average grade in 0-10 scale
  minedLevel?: MinedLevel; // 1 to 5
  createdAt?: string;
  descriptor?: TechnicalModuleDescriptor;
}

export interface LMSCourseModule {
  id: string;
  courseId: string;
  stageKey?: ActionStageKey; // Maps to 6 stages of complete action
  title: string;
  description?: string;
  order: number;
  locked: boolean;
  hours?: number;
  completed?: boolean;
  startDate?: string;
  endDate?: string;
  resourcesCount?: number;
  activitiesCount?: number;
}

export interface LMSActivity {
  id: string;
  courseId: string;
  courseName?: string;
  courseCode?: string;
  courseColor?: string;
  moduleId?: string;
  moduleTitle?: string;
  stageKey?: ActionStageKey; // Step of action complete
  title: string;
  type: ActivityType;
  rubricId?: string;
  rubric?: Rubric;
  maxScore: number;
  dueDate: string; // ISO date string
  instructions: string;
  attachments?: { name: string; url: string; size: string; type: string }[];
  status?: ActivityStatus;
  submission?: LMSSubmission;
  academicYear?: string;
}

export interface LMSSubmission {
  id: string;
  activityId: string;
  studentId: string;
  studentName?: string;
  submittedAt: string;
  content: string;
  attachments: { name: string; size: string; url?: string }[];
  grade?: number; // 0 to 10
  minedLevel?: MinedLevel; // 1 to 5
  feedback?: string;
  gradedAt?: string;
  criterionScores?: Record<string, number>; // criterionId -> selected level score (1-5)
  axisLevels?: {
    tecnico: MinedLevel;
    emprendedor: MinedLevel;
    humanoSocial: MinedLevel;
    academico: MinedLevel;
  };
  axesScores?: {
    scoreTecnico: number;
    scoreEmprendedor: number;
    scoreHumanoSocial: number;
    scoreAcademicoAplicado: number;
  };
  selfEvaluation?: {
    learned: string;
    difficulties: string;
    reflection: string;
  };
}

export interface LMSEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: string;
  progress: number; // 0-100
  finalGrade?: number;
  minedLevel?: MinedLevel;
}

export interface LMSStudentSummary {
  enrolledCoursesCount: number;
  pendingActivitiesCount: number;
  completedActivitiesCount: number;
  overallAverage: number;
  overallMinedLevel: MinedLevel;
  progressPercentage: number;
  totalTechnicalHours: number;
  currentYear: TechnicalYear;
}

// ==========================================
// DOCUMENTACIÓN INSTITUCIONAL COLEGIO SALESIANO SAN JOSÉ
// ==========================================

export interface CSSJCalendarPeriod {
  id: string;
  name: string; // ej: "PRIMER PERIODO (19 enero – 20 marzo)" o "Trimestre I"
  level: 'Media' | 'Basica_Parvularia';
  fechaInicio: string;
  fechaCierre: string;
  ingresoTBox: string;
  diagnosticas?: { inicio: string; fin: string };
  actividad1_35?: { inicio: string; fin: string; ingresoTBox: string };
  actividad2_35?: { inicio: string; fin: string; ingresoTBox: string };
  refuerzo?: { inicio: string; fin: string };
  pruebaObjetiva_30?: { inicio: string; fin: string; ingresoTBox: string };
  pruebaExtraordinaria?: { inicio: string; fin: string; ingresoTBox: string };
  actividadesPendientes?: { inicio: string; fin: string; ingresoTBox: string };
  boletasCalificaciones: string;
  temariosCoordinacion?: { inicio: string; fin: string };
}

export interface CSSJJornalizacionUnit {
  unitNumber: number;
  title: string;
  totalObjectives: number;
  classHours: number;
  fechaInicio: string;
  fechaFin: string;
}

export interface CSSJJornalizacion {
  id: string;
  docente: string;
  gradoSeccion: string;
  asignatura: string;
  anioLectivo: number;
  totalSemanas: number; // 40
  totalDias: number; // 200
  horasSemanales: number;
  horasAnuales: number; // 160h para básicas / 720h-1200h para técnicos
  unidades: CSSJJornalizacionUnit[];
  trimestre1: { inicio: string; fin: string };
  trimestre2: { inicio: string; fin: string };
  trimestre3: { inicio: string; fin: string };
}

export interface CSSJPlanDidactico {
  id: string;
  centroEducativo: string; // "Colegio Salesiano San José"
  docente: string;
  asignatura: string;
  grado: string;
  seccion: string;
  unidadNumero: number;
  unidadNombre: string;
  trimestrePeriodo: string;
  tiempoHoras: number;
  fechas: string;
  competenciasAsignatura: string;
  competenciasUnidad: string;
  // Saberes MINEDUCYT
  contenidosConceptuales: string[]; // Saber Conocer
  contenidosProcedimentales: string[]; // Saber Hacer
  contenidosActitudinales: string[]; // Saber Ser
  metodologia: string;
  indicadoresLogro: string[];
  actividadesEvaluacion: {
    no: number;
    nombre: string;
    ponderacion: string;
    fechaRealizacion: string;
  }[];
  recursos: string;
  tics: string;
  bibliografiaEgrafia: string[];
}

export interface CSSJGuionClase {
  id: string;
  docente: string;
  gradoSeccion: string;
  trimestre: string;
  fecha: string;
  unidad: string;
  contenido: string;
  tiempoMinutos: number;
  objetivoClase: string;
  indicadorLogro: string;
  competenciasEspecificas: string;
  ejeTransversal: string;
  // Situaciones de Aprendizaje vs Evaluación
  inicio: {
    situacion: string;
    tipoEvaluacion: string; // "Diagnóstica (sin valor numérico)"
    estrategia: string;
  };
  desarrollo: {
    situacion: string;
    tipoEvaluacion: string; // "Formativa (sin valor numérico)"
    estrategia: string;
  };
  cierre: {
    situacion: string;
    tipoEvaluacion: string; // "Sumativa (con valor % en cuadro)"
    ponderacionPorcentaje?: number;
    propuestaActividades: string;
    analisisDesempeno: string;
  };
  adaptacionesCurriculares: string;
  actividadesEvaluacion: {
    no: number;
    actividad: string;
    ponderacion: string;
    fecha: string;
  }[];
  tarea: string;
  bibliografiaAPA7: string;
  recursosClase: string;
  tics: string;
}

export interface CSSJCuadroSubactividad {
  no: number;
  nombre: string;
  descripcion: string;
  criteriosEvaluacion: string;
  formato: 'Entrega en físico' | 'Entrega en plataforma (LMS)' | 'Mixto (Físico + Digital)';
  porcentaje: number;
  fechaEntrega: string;
  rubricaAdjuntaInfo: string;
}

export interface CSSJCuadroActividades {
  id: string;
  centroEducativo: string;
  nivelEducativo: string; // "Educación Media" o "Educación Básica"
  gradoSeccion: string;
  docente: string;
  asignatura: string;
  trimestrePeriodo: string;
  actividadTitulo: string; // "Actividad N° 01 – 35%" o "Actividad N° 02 – 35%"
  fechaRango: string;
  subactividades: CSSJCuadroSubactividad[];
  indicacionesCoordinacion: {
    politicaRetraso: string;
    limiteDias: string;
    periodoExtraordinario: string;
    manualConvivencia: string;
  };
}

export interface CSSJTemarioEvaluacion {
  id: string;
  docente: string;
  asignatura: string;
  gradoSeccion: string;
  periodoTrimestre: string;
  porcentaje: string; // "30%"
  periodoComprendido: string; // "Tomado de la jornalización"
  contenidosAEvaluar: {
    contenido: string;
    paginaEspecificacion: string;
  }[];
  indicadoresLogro: string[];
  indicacionesGenerales: string;
}

// ==========================================
// RÚBRICA POR COMPETENCIAS BTV DISEÑO GRÁFICO (29 ÍTEMS OFICIALES)
// ==========================================

export interface BTVRubricCriterionItem {
  id: string;
  axis: 'tecnico' | 'emprendedor' | 'humano' | 'academico';
  axisLabel: string;
  weightPercentage: number; // 35%, 25%, 20%, 20%
  code: string; // ej: "T1", "E2", "H3", "A1"
  name: string;
  description: string;
  descriptorNivel1: string; // Con mucha ayuda (1.0 - 4.9)
  descriptorNivel2: string; // Con poca ayuda (5.0 - 5.9)
  descriptorNivel3: string; // Con eventual ayuda (6.0 - 6.9)
  descriptorNivel4: string; // Por sí mismo(a) [Aprobado 7.0 - 8.9]
  descriptorNivel5: string; // Por sí mismo(a) y ayuda a otros [9.0 - 10.0]
}

