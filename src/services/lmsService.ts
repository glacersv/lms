// SERVICIO CENTRAL LMS — BACHILLERATO TÉCNICO VOCACIONAL EN DISEÑO GRÁFICO
// Basado en el Plan y Programa de Estudio Oficial (MINED / Instituto Técnico Ricaldone)
// Enfoque de Competencias Orientadas a la Acción • 6 Etapas • Escala MINED 1-5

import {
  LMSCourse,
  LMSCourseModule,
  LMSActivity,
  LMSSubmission,
  Rubric,
  LMSStudentSummary,
  TechnicalYear,
  ActionStageKey,
  MinedLevel,
  ProjectBrief,
} from '../types';
import {
  BTV_GRAPHIC_DESIGN_COURSES,
  getModuleDescriptorData,
  DEFAULT_BTV_RUBRICS,
  GENERATE_ANNUAL_PROJECT,
} from './btvCurriculumData';

const STORAGE_KEY = 'campus_lms_btvdg_state_v2';
const ACTIVE_YEAR_KEY = 'campus_lms_active_cohort_year';

// Genera los 6 módulos de acción completa para un curso
const buildActionStageModules = (courseId: string): LMSCourseModule[] => {
  const stages: { stageKey: ActionStageKey; title: string; desc: string; order: number; locked: boolean }[] = [
    {
      stageKey: 'informar',
      title: 'Etapa 1: Informarse (10% de horas)',
      desc: 'Investigación documental, cuestionario de saberes previos y recopilación de antecedentes teóricos/gráficos.',
      order: 1,
      locked: false,
    },
    {
      stageKey: 'planificar',
      title: 'Etapa 2: Planificar (10% de horas)',
      desc: 'Plan de trabajo, matriz de marco lógico, cronograma de ruta crítica y asignación de roles de equipo.',
      order: 2,
      locked: false,
    },
    {
      stageKey: 'decidir',
      title: 'Etapa 3: Decidir (10% de horas)',
      desc: 'Formulario de decisiones, evaluación de alternativas (pros/contras, Delphi) y consenso de propuesta gráfica.',
      order: 3,
      locked: false,
    },
    {
      stageKey: 'ejecutar',
      title: 'Etapa 4: Ejecutar (25% de horas)',
      desc: 'Bocetería, experimentación de técnicas manuales/digitales, armado de dummies, prototipos y arte final.',
      order: 4,
      locked: false,
    },
    {
      stageKey: 'controlar',
      title: 'Etapa 5: Controlar (25% de horas)',
      desc: 'Monitoreo de avance en cronograma, listas de cotejo, análisis FODA y control de calidad de pruebas de color.',
      order: 5,
      locked: false,
    },
    {
      stageKey: 'valorar',
      title: 'Etapa 6: Valorar y Reflexionar (20% de horas)',
      desc: 'Evaluación por rúbrica MINED (escala 1-5), autoevaluación, coevaluación, defensa oral y feria de proyectos.',
      order: 6,
      locked: false,
    },
  ];

  return stages.map((s) => ({
    id: `mod-${courseId}-${s.stageKey}`,
    courseId,
    stageKey: s.stageKey,
    title: s.title,
    description: s.desc,
    order: s.order,
    locked: s.locked,
    resourcesCount: 3,
    activitiesCount: 1,
  }));
};

// Genera actividades oficiales alineadas a las 6 etapas para los módulos
const buildInitialActivities = (courses: LMSCourse[]): LMSActivity[] => {
  const activities: LMSActivity[] = [];

  courses.forEach((c) => {
    // Actividad 1: Saberes Previos e Investigación (Etapa Informar)
    activities.push({
      id: `act-${c.id}-info`,
      courseId: c.id,
      courseName: c.name,
      courseCode: c.code,
      courseColor: c.color,
      moduleId: `mod-${c.id}-informar`,
      moduleTitle: 'Etapa 1: Informarse',
      stageKey: 'informar',
      title: `Diagnóstico de Saberes Previos e Investigación: ${c.name}`,
      type: 'evaluated',
      maxScore: 10,
      dueDate: '2026-03-10T23:59:00Z',
      instructions: `1. Completa el Cuestionario Diagnóstico de Saberes Previos (clasifica en MUCHO, POCO, NADA).\n2. Desarrolla una investigación bibliográfica sobre los fundamentos de ${c.name}.\n3. Elabora un mapa mental o fichas técnicas con los términos clave.`,
      status: c.technicalYear === '1' ? 'calificada' : 'pendiente',
      submission:
        c.technicalYear === '1'
          ? {
              id: `sub-${c.id}-info`,
              activityId: `act-${c.id}-info`,
              studentId: 'student-glacer',
              studentName: 'Estudiante Salesiano',
              submittedAt: '2026-02-18T14:30:00Z',
              content: `Entrega completada con diagnóstico de saberes previos y marco teórico estructurado para ${c.name}.`,
              attachments: [{ name: 'Diagnostico_Saberes_Previos.pdf', size: '1.2 MB' }],
              grade: 9.0,
              minedLevel: 5,
              feedback: 'Excelente investigación y contextualización al marco teórico oficial.',
              gradedAt: '2026-02-20T10:00:00Z',
              axisLevels: {
                tecnico: 5,
                emprendedor: 4,
                humanoSocial: 5,
                academico: 5,
              },
            }
          : undefined,
    });

    // Actividad 2: Plan de Trabajo y Decisiones (Etapas Planificar / Decidir)
    activities.push({
      id: `act-${c.id}-plan`,
      courseId: c.id,
      courseName: c.name,
      courseCode: c.code,
      courseColor: c.color,
      moduleId: `mod-${c.id}-planificar`,
      moduleTitle: 'Etapa 2: Planificar',
      stageKey: 'planificar',
      title: `Plan de Trabajo y Matriz de Decisiones para Proyecto Anual`,
      type: 'delivery',
      maxScore: 10,
      dueDate: '2026-03-24T23:59:00Z',
      instructions: `Estructura en equipo el plan de acción bajo marco lógico:\n- Definición del problema y objetivo general.\n- Cronograma de ruta crítica con fechas de entrega.\n- Formulario de Decisiones: asignación de roles (¿Quiénes? ¿Con qué? ¿Dónde? Tiempo).`,
      status: c.technicalYear === '1' ? 'calificada' : 'pendiente',
      submission:
        c.technicalYear === '1'
          ? {
              id: `sub-${c.id}-plan`,
              activityId: `act-${c.id}-plan`,
              studentId: 'student-glacer',
              studentName: 'Estudiante Salesiano',
              submittedAt: '2026-02-25T16:00:00Z',
              content: 'Plan de trabajo y cronograma de ruta crítica validado con el docente técnico.',
              attachments: [{ name: 'Plan_Trabajo_Ruta_Critica.pdf', size: '2.4 MB' }],
              grade: 8.5,
              minedLevel: 4,
              feedback: 'Muy buena distribución de responsabilidades en el equipo cooperativo.',
              gradedAt: '2026-02-28T09:00:00Z',
              axisLevels: {
                tecnico: 4,
                emprendedor: 4,
                humanoSocial: 5,
                academico: 4,
              },
            }
          : undefined,
    });

    // Actividad 3: Proyecto Final con Rúbrica Oficial MINED (Etapas Ejecutar, Controlar, Valorar)
    activities.push({
      id: `act-${c.id}-proj`,
      courseId: c.id,
      courseName: c.name,
      courseCode: c.code,
      courseColor: c.color,
      moduleId: `mod-${c.id}-valorar`,
      moduleTitle: 'Etapa 6: Valorar y Reflexionar',
      stageKey: 'valorar',
      title: `Entrega de Proyecto Integrador y Evaluación por Rúbrica MINED (Escala 1-5)`,
      type: 'rubric',
      rubricId: 'rubric-btv-standard',
      rubric: DEFAULT_BTV_RUBRICS['rubric-btv-standard'],
      maxScore: 10,
      dueDate: '2026-04-15T23:59:00Z',
      instructions: `Presentación final del proyecto anual ante jurado evaluador:\n- Bocetería y justificación en Racional Creativo.\n- Artes finales digitales e impresos a escala real.\n- Evidencias de bitácora y control FODA.\n- Evaluación criterial en los 4 Ejes (Técnico, Emprendedor, Humano-Social, Académico). Nivel mínimo de aprobación: 4 (7.0).`,
      status: c.technicalYear === '1' && c.code === 'BTVDG1.0' ? 'calificada' : 'pendiente',
      submission:
        c.technicalYear === '1' && c.code === 'BTVDG1.0'
          ? {
              id: `sub-${c.id}-proj`,
              activityId: `act-${c.id}-proj`,
              studentId: 'student-glacer',
              studentName: 'Estudiante Salesiano',
              submittedAt: '2026-03-05T11:00:00Z',
              content: 'Entrega final del proyecto integrador con memorias técnicas y artes finales adjuntos.',
              attachments: [
                { name: 'Proyecto_Final_Artes.pdf', size: '14.5 MB' },
                { name: 'Racional_Creativo.pdf', size: '1.8 MB' },
              ],
              grade: 9.5,
              minedLevel: 5,
              feedback: 'Desempeño destacado. Cumplió con creces todos los criterios del Nivel 5.',
              gradedAt: '2026-03-08T15:00:00Z',
              axisLevels: {
                tecnico: 5,
                emprendedor: 5,
                humanoSocial: 5,
                academico: 4,
              },
            }
          : undefined,
    });
  });

  return activities;
};

class LMSService {
  private courses: LMSCourse[] = [];
  private modules: LMSCourseModule[] = [];
  private activities: LMSActivity[] = [];
  private rubrics: Record<string, Rubric> = DEFAULT_BTV_RUBRICS;
  private activeYear: TechnicalYear = '1';
  private academicCohortYear: string = '2026';
  private listeners: (() => void)[] = [];

  constructor() {
    this.init();
  }

  private init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedYear = localStorage.getItem(ACTIVE_YEAR_KEY);

    if (savedYear) {
      this.academicCohortYear = savedYear;
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.courses = parsed.courses || [];
        this.modules = parsed.modules || [];
        this.activities = parsed.activities || [];
        this.rubrics = parsed.rubrics || DEFAULT_BTV_RUBRICS;
        this.activeYear = parsed.activeYear || '1';

        // Asegurar que cada curso tenga su descriptor enriquecido
        this.courses.forEach((c) => {
          if (!c.descriptor) {
            c.descriptor = getModuleDescriptorData(c.code);
          }
        });
      } catch (e) {
        console.error('Error loading LMS state from localStorage, initializing fresh', e);
        this.seedInitialData();
      }
    } else {
      this.seedInitialData();
    }
  }

  private seedInitialData() {
    // 1. Inicializar los cursos con sus descriptores completos
    this.courses = BTV_GRAPHIC_DESIGN_COURSES.map((c) => {
      const descriptor = getModuleDescriptorData(c.code);
      return {
        ...c,
        descriptor,
      };
    });

    // 2. Construir los módulos de las 6 etapas para cada curso
    this.modules = [];
    this.courses.forEach((c) => {
      const courseMods = buildActionStageModules(c.id);
      this.modules.push(...courseMods);
    });

    // 3. Construir actividades iniciales
    this.activities = buildInitialActivities(this.courses);

    // 4. Rúbricas oficiales MINED
    this.rubrics = DEFAULT_BTV_RUBRICS;
    this.activeYear = '1';

    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          courses: this.courses,
          modules: this.modules,
          activities: this.activities,
          rubrics: this.rubrics,
          activeYear: this.activeYear,
          academicCohortYear: this.academicCohortYear,
        })
      );
      localStorage.setItem(ACTIVE_YEAR_KEY, this.academicCohortYear);
    } catch (e) {
      console.error('Failed to save LMS state to localStorage', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // ==========================================
  // YEAR & COHORT MANAGEMENT
  // ==========================================
  public getActiveTechnicalYear(): TechnicalYear {
    return this.activeYear;
  }

  public setActiveTechnicalYear(year: TechnicalYear) {
    this.activeYear = year;
    this.saveToStorage();
  }

  public getAcademicCohortYear(): string {
    return this.academicCohortYear;
  }

  public setAcademicCohortYear(year: string) {
    this.academicCohortYear = year;
    this.saveToStorage();
  }

  // ==========================================
  // COURSES / MÓDULOS TÉCNICOS
  // ==========================================
  public getCourses(yearFilter?: TechnicalYear): LMSCourse[] {
    if (yearFilter) {
      return this.courses.filter((c) => c.technicalYear === yearFilter);
    }
    return this.courses;
  }

  public getCourseById(courseId: string): LMSCourse | undefined {
    const c = this.courses.find((x) => x.id === courseId || x.code === courseId);
    if (c && !c.descriptor) {
      c.descriptor = getModuleDescriptorData(c.code);
    }
    return c;
  }

  public getCourseByCode(code: string): LMSCourse | undefined {
    return this.courses.find((x) => x.code.toLowerCase() === code.toLowerCase());
  }

  // ==========================================
  // GESTIÓN Y GENERADOR DE PROYECTOS ANUALES
  // ==========================================
  public generateAndSetAnnualProject(
    courseId: string,
    academicYear: string,
    customTopic?: string
  ): ProjectBrief {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Curso no encontrado');

    const newProject = GENERATE_ANNUAL_PROJECT(course.code, academicYear, customTopic);

    if (!course.descriptor) {
      course.descriptor = getModuleDescriptorData(course.code);
    }

    // Archivar proyecto actual si existía
    if (course.descriptor.currentProject) {
      course.descriptor.availableProjects = course.descriptor.availableProjects || [];
      course.descriptor.availableProjects.push({
        ...course.descriptor.currentProject,
        status: 'archived',
      });
    }

    course.descriptor.currentProject = newProject;
    this.saveToStorage();
    return newProject;
  }

  public updateCourseProject(courseId: string, projectData: Partial<ProjectBrief>): ProjectBrief {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Curso no encontrado');
    if (!course.descriptor) {
      course.descriptor = getModuleDescriptorData(course.code);
    }

    course.descriptor.currentProject = {
      ...course.descriptor.currentProject,
      ...projectData,
    };

    this.saveToStorage();
    return course.descriptor.currentProject;
  }

  // Genera proyectos anuales para todos los módulos de un año técnico
  public batchGenerateProjectsForYear(academicYear: string, technicalYear?: TechnicalYear) {
    const targetCourses = technicalYear
      ? this.courses.filter((c) => c.technicalYear === technicalYear)
      : this.courses;

    targetCourses.forEach((c) => {
      this.generateAndSetAnnualProject(c.id, academicYear);
    });

    this.academicCohortYear = academicYear;
    this.saveToStorage();
  }

  // ==========================================
  // MODULES (6 ETAPAS DE ACCIÓN COMPLETA)
  // ==========================================
  public getModulesByCourse(courseId: string): LMSCourseModule[] {
    return this.modules
      .filter((m) => m.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  public toggleModuleLock(moduleId: string): LMSCourseModule | undefined {
    const mod = this.modules.find((m) => m.id === moduleId);
    if (mod) {
      mod.locked = !mod.locked;
      this.saveToStorage();
    }
    return mod;
  }

  // ==========================================
  // ACTIVITIES & SUBMISSIONS
  // ==========================================
  public getActivities(courseId?: string, yearFilter?: TechnicalYear): LMSActivity[] {
    let list = this.activities;
    if (courseId) {
      list = list.filter((a) => a.courseId === courseId);
    } else if (yearFilter) {
      const yearCourseIds = new Set(this.courses.filter((c) => c.technicalYear === yearFilter).map((c) => c.id));
      list = list.filter((a) => yearCourseIds.has(a.courseId));
    }
    return list;
  }

  public getActivityById(activityId: string): LMSActivity | undefined {
    return this.activities.find((a) => a.id === activityId);
  }

  public submitActivity(
    activityId: string,
    submissionData: {
      content: string;
      attachments: { name: string; size: string; url?: string }[];
      criterionScores?: Record<string, number>;
      selfEvaluation?: {
        learned: string;
        difficulties: string;
        reflection: string;
      };
    }
  ): LMSSubmission {
    const actIdx = this.activities.findIndex((a) => a.id === activityId);
    if (actIdx === -1) throw new Error('Actividad no encontrada');

    const submission: LMSSubmission = {
      id: `sub-${Date.now()}`,
      activityId,
      studentId: 'student-glacer',
      studentName: 'Estudiante Salesiano',
      submittedAt: new Date().toISOString(),
      content: submissionData.content,
      attachments: submissionData.attachments,
      criterionScores: submissionData.criterionScores,
      selfEvaluation: submissionData.selfEvaluation,
    };

    this.activities[actIdx] = {
      ...this.activities[actIdx],
      status: 'entregada',
      submission,
    };

    // Recalcular progreso
    this.recalculateCourseProgress(this.activities[actIdx].courseId);
    this.saveToStorage();
    return submission;
  }

  // ==========================================
  // ADMIN CRUD METHODS FOR COURSES, MODULES, ACTIVITIES
  // ==========================================
  public addCourse(courseData: Partial<LMSCourse> & { name: string; code: string }): LMSCourse {
    const newCourse: LMSCourse = {
      id: `course-${Date.now()}`,
      name: courseData.name,
      code: courseData.code,
      description: courseData.description || '',
      teacherId: courseData.teacherId || 'doc-1',
      teacherName: courseData.teacherName || 'Docente de Especialidad',
      gradeId: courseData.gradeId || '10',
      gradeName: courseData.gradeName || '1° Año Técnico',
      sectionId: courseData.sectionId || 'A',
      sectionName: courseData.sectionName || 'Sección A',
      subjectId: courseData.subjectId || 'diseno-grafico',
      icon: courseData.icon || 'BookOpen',
      color: courseData.color || '#0D71B9',
      status: courseData.status || 'active',
      schedule: courseData.schedule || 'Lunes a Viernes',
      classroom: courseData.classroom || 'Taller de Diseño',
      progress: 0,
      averageGrade: undefined,
      minedLevel: undefined,
      technicalYear: courseData.technicalYear || '1',
      hours: courseData.hours || 72,
      weeks: courseData.weeks || 4,
      affineArea: courseData.affineArea || 'Diseño y diagramación',
      unitsCount: 0,
      activitiesCount: 0,
      descriptor: courseData.descriptor || getModuleDescriptorData(courseData.code),
    };

    this.courses.push(newCourse);
    this.saveToStorage();
    return newCourse;
  }

  public deleteCourse(courseId: string): boolean {
    const initialLen = this.courses.length;
    this.courses = this.courses.filter((c) => c.id !== courseId);
    this.modules = this.modules.filter((m) => m.courseId !== courseId);
    this.activities = this.activities.filter((a) => a.courseId !== courseId);
    if (this.courses.length !== initialLen) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public addModule(moduleData: {
    courseId: string;
    title: string;
    description: string;
    order?: number;
    hours?: number;
    stageKey?: ActionStageKey;
  }): LMSCourseModule {
    const existing = this.modules.filter((m) => m.courseId === moduleData.courseId);
    const newMod: LMSCourseModule = {
      id: `mod-${Date.now()}`,
      courseId: moduleData.courseId,
      title: moduleData.title,
      description: moduleData.description,
      order: moduleData.order ?? existing.length + 1,
      locked: false,
      hours: moduleData.hours || 18,
      stageKey: moduleData.stageKey || 'ejecutar',
      completed: false,
    };
    this.modules.push(newMod);

    const c = this.getCourseById(moduleData.courseId);
    if (c) {
      c.unitsCount = this.modules.filter((m) => m.courseId === moduleData.courseId).length;
    }

    this.saveToStorage();
    return newMod;
  }

  public addActivity(activityData: Partial<LMSActivity> & { courseId: string; title: string }): LMSActivity {
    const c = this.getCourseById(activityData.courseId);
    const newAct: LMSActivity = {
      id: `act-${Date.now()}`,
      courseId: activityData.courseId,
      courseName: c?.name || 'Módulo Técnico',
      moduleId: activityData.moduleId || 'mod-default',
      moduleTitle: activityData.moduleTitle || 'Etapa del Proyecto',
      stageKey: activityData.stageKey || 'ejecutar',
      title: activityData.title,
      type: activityData.type || 'delivery',
      rubricId: activityData.rubricId || 'rubric-btv-standard',
      maxScore: activityData.maxScore || 10,
      dueDate: activityData.dueDate || new Date(Date.now() + 7 * 86400000).toISOString(),
      instructions: activityData.instructions || 'Siga las especificaciones técnicas del brief.',
      status: 'pendiente',
    };
    this.activities.push(newAct);

    if (c) {
      c.activitiesCount = this.activities.filter((a) => a.courseId === activityData.courseId).length;
    }

    this.saveToStorage();
    return newAct;
  }

  // Basic numeric grade for compatibility
  public gradeActivity(activityId: string, grade: number, feedback?: string): LMSActivity | undefined {
    const act = this.activities.find((a) => a.id === activityId);
    if (!act) return undefined;

    const level: MinedLevel =
      grade >= 9.6 ? 5 :
      grade >= 8.5 ? 4 :
      grade >= 7.0 ? 3 :
      grade >= 5.0 ? 2 : 1;

    if (!act.submission) {
      act.submission = {
        id: `sub-${Date.now()}`,
        activityId,
        studentId: 'student-glacer',
        submittedAt: new Date().toISOString(),
        content: 'Entrega en aula',
        attachments: [],
      };
    }

    act.submission.grade = grade;
    act.submission.minedLevel = level;
    act.submission.feedback = feedback;
    act.submission.gradedAt = new Date().toISOString();
    act.status = 'calificada';

    this.recalculateCourseProgress(act.courseId);
    this.saveToStorage();
    return act;
  }

  // CALIFICACIÓN DOCENTE CON ESCALA MINED (1-5) Y LOS 4 EJES
  public gradeWithMinedScale(
    activityId: string,
    params: {
      scoreTecnico?: number;
      scoreEmprendedor?: number;
      scoreHumanoSocial?: number;
      scoreAcademicoAplicado?: number;
      axisLevels?: {
        tecnico: MinedLevel;
        emprendedor: MinedLevel;
        humanoSocial: MinedLevel;
        academico: MinedLevel;
      };
    },
    feedbackInput?: string
  ): LMSActivity | undefined {
    const act = this.activities.find((a) => a.id === activityId);
    if (!act) return undefined;

    let calculatedGrade = 8.5;
    let finalMinedLevel: MinedLevel = 4;

    if (params.scoreTecnico !== undefined && params.scoreEmprendedor !== undefined) {
      const st = params.scoreTecnico ?? 8.5;
      const se = params.scoreEmprendedor ?? 8.5;
      const sh = params.scoreHumanoSocial ?? 8.5;
      const sa = params.scoreAcademicoAplicado ?? 8.5;

      calculatedGrade = +(st * 0.35 + se * 0.25 + sh * 0.20 + sa * 0.20).toFixed(1);
      finalMinedLevel =
        calculatedGrade >= 9.6 ? 5 :
        calculatedGrade >= 8.5 ? 4 :
        calculatedGrade >= 7.0 ? 3 :
        calculatedGrade >= 5.0 ? 2 : 1;
    } else if (params.axisLevels) {
      const weightedLevel =
        params.axisLevels.tecnico * 0.35 +
        params.axisLevels.emprendedor * 0.25 +
        params.axisLevels.humanoSocial * 0.2 +
        params.axisLevels.academico * 0.2;

      finalMinedLevel = Math.max(1, Math.min(5, Math.round(weightedLevel))) as MinedLevel;
      const levelToGradeMap: Record<MinedLevel, number> = {
        1: 3.5,
        2: 5.5,
        3: 6.5,
        4: 8.5,
        5: 10.0,
      };
      calculatedGrade = parseFloat((levelToGradeMap[finalMinedLevel] || 7.0).toFixed(1));
    }

    if (!act.submission) {
      act.submission = {
        id: `sub-${Date.now()}`,
        activityId,
        studentId: 'student-glacer',
        submittedAt: new Date().toISOString(),
        content: 'Entrega registrada en aula',
        attachments: [],
      };
    }

    act.submission.grade = calculatedGrade;
    act.submission.minedLevel = finalMinedLevel;
    if (params.axisLevels) {
      act.submission.axisLevels = params.axisLevels;
    }
    if (params.scoreTecnico !== undefined) {
      act.submission.axesScores = {
        scoreTecnico: params.scoreTecnico,
        scoreEmprendedor: params.scoreEmprendedor || 8,
        scoreHumanoSocial: params.scoreHumanoSocial || 8,
        scoreAcademicoAplicado: params.scoreAcademicoAplicado || 8,
      };
    }
    act.submission.feedback = feedbackInput || 'Evaluación registrada con rúbrica MINED.';
    act.submission.gradedAt = new Date().toISOString();
    act.status = 'calificada';

    this.recalculateCourseProgress(act.courseId);
    this.saveToStorage();
    return act;
  }

  private recalculateCourseProgress(courseId: string) {
    const courseActs = this.activities.filter((a) => a.courseId === courseId);
    if (courseActs.length === 0) return;

    const completed = courseActs.filter(
      (a) => a.status === 'entregada' || a.status === 'calificada'
    ).length;

    const course = this.getCourseById(courseId);
    if (course) {
      course.progress = Math.round((completed / courseActs.length) * 100);

      const graded = courseActs.filter(
        (a) => a.status === 'calificada' && a.submission?.grade !== undefined
      );
      if (graded.length > 0) {
        const total = graded.reduce((sum, a) => sum + (a.submission?.grade || 0), 0);
        course.averageGrade = parseFloat((total / graded.length).toFixed(1));

        // Calcular Mined Level para el curso
        const totalLevels = graded.reduce((sum, a) => sum + (a.submission?.minedLevel || 4), 0);
        course.minedLevel = Math.max(1, Math.min(5, Math.round(totalLevels / graded.length))) as MinedLevel;
      }
    }
  }

  // ==========================================
  // SABERES PREVIOS (ACTUALIZACIÓN ESTUDIANTE)
  // ==========================================
  public updateSaberPrevioAppreciation(
    courseId: string,
    saberId: string,
    appreciation: 'MUCHO' | 'POCO' | 'NADA'
  ) {
    const course = this.getCourseById(courseId);
    if (!course || !course.descriptor) return;

    const item = course.descriptor.saberesPrevios.find((s) => s.id === saberId);
    if (item) {
      item.appreciation = appreciation;
      this.saveToStorage();
    }
  }

  // ==========================================
  // RESÚMENES Y ESTADÍSTICAS GLOBALES
  // ==========================================
  public getStudentSummary(yearFilter?: TechnicalYear): LMSStudentSummary {
    const currentYear = yearFilter || this.activeYear;
    const yearCourses = this.courses.filter((c) => c.technicalYear === currentYear);
    const yearCourseIds = new Set(yearCourses.map((c) => c.id));
    const yearActs = this.activities.filter((a) => yearCourseIds.has(a.courseId));

    const pending = yearActs.filter((a) => a.status === 'pendiente').length;
    const completed = yearActs.filter(
      (a) => a.status === 'entregada' || a.status === 'calificada'
    ).length;

    const gradedActs = yearActs.filter(
      (a) => a.status === 'calificada' && a.submission?.grade !== undefined
    );

    const avg =
      gradedActs.length > 0
        ? parseFloat(
            (
              gradedActs.reduce((acc, a) => acc + (a.submission?.grade || 0), 0) /
              gradedActs.length
            ).toFixed(1)
          )
        : 8.8;

    const totalLevels = gradedActs.reduce((acc, a) => acc + (a.submission?.minedLevel || 4), 0);
    const overallMined = gradedActs.length > 0 ? (Math.round(totalLevels / gradedActs.length) as MinedLevel) : 4;

    const totalHours = currentYear === '3' ? 1200 : 720;
    const progressPct = yearActs.length > 0 ? Math.round((completed / yearActs.length) * 100) : 0;

    return {
      enrolledCoursesCount: yearCourses.length,
      pendingActivitiesCount: pending,
      completedActivitiesCount: completed,
      overallAverage: avg,
      overallMinedLevel: overallMined,
      progressPercentage: progressPct,
      totalTechnicalHours: totalHours,
      currentYear,
    };
  }

  public getRubricById(rubricId: string): Rubric | undefined {
    return this.rubrics[rubricId] || DEFAULT_BTV_RUBRICS['rubric-btv-standard'];
  }

  public resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    this.seedInitialData();
  }
}

export const lmsService = new LMSService();
