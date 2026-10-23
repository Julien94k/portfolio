import type { Education, Experience, SkillGroup, Testimonial } from './types'

export const profile = {
  name: 'Julien Lim',
  role: 'Développeur full-stack Java, Spring Boot et React',
  location: 'Île-de-France',
  intro: [
    'Je développe des applications web de bout en bout, de la migration de base de données jusqu’à l’écran.',
    'J’ai passé six mois chez Takima sur Tima, un logiciel de recrutement en production que des recruteurs utilisent chaque jour. J’y ai livré une trentaine de fonctionnalités et de correctifs, dont l’intégration de modèles de langage et la sécurisation de l’API REST.',
  ],
  availability: 'Je cherche un CDI en développement full-stack, disponible dès maintenant.',
  linkedin: 'https://www.linkedin.com/in/lim-julien',
  github: 'https://github.com/Julien94k',
  repository: 'https://github.com/Julien94k/portfolio',
}

export const experiences: Experience[] = [
  {
    title: 'Développeur full-stack, stage de fin d’études',
    organization: 'Takima',
    place: 'Bagneux (92)',
    period: 'd’avril à septembre 2026',
    summary:
      'Takima est une ESN d’environ 200 personnes spécialisée en Java, Spring et React. Après la formation interne, j’ai rejoint l’équipe de Tima, l’outil de recrutement utilisé par les recruteurs de Takima et d’un client externe.',
    items: [
      'Une trentaine de fonctionnalités et de correctifs livrés, en Scrumban : sprints de deux semaines, revue de code et validation QA avant chaque mise en production.',
      'Création automatique des missions de recrutement à partir des e-mails clients et de leurs pièces jointes, analysés par un LLM (Spring AI, sorties JSON structurées, stockage S3). Les recruteurs n’ont plus à tout ressaisir.',
      'Récupération des comptes rendus d’entretien Gemini (API Google Meet et Drive) pour pré-remplir les évaluations, et changement de fournisseur de LLM par simple configuration (OpenAI vers OpenRouter).',
      'Contrôle d’accès au niveau de chaque objet sur l’API REST (Spring Security, Keycloak) et formulaire d’inscription public protégé contre le mass-assignment, couverts par des tests.',
      'Fonctionnalités de bout en bout, de la migration Flyway à l’écran React : notification des candidats par e-mail via un microservice Kafka, entretiens avec participants externes, champs mission et TJM.',
      'Bugs de production corrigés, dont une recherche insensible aux accents qui ne l’était pas toujours, et une pipeline GitLab CI qui bloquait toute l’équipe.',
    ],
    caseStudy: 'tima',
  },
]

export const education: Education[] = [
  {
    period: '2026',
    title: 'Master 2 Informatique, parcours IMPAIRS',
    organization: 'Université Paris Cité',
    detail: 'Mention assez bien. Bases de données avancées, génie logiciel, interfaces graphiques.',
  },
  {
    period: 'avril – juin 2026',
    title: 'Programme Master 3',
    organization: 'Takima',
    detail:
      'Huit semaines de formation interne autour d’un fil rouge : une marketplace full-stack, écrite en Java puis en Kotlin. Spring Boot, JPA et Hibernate, PostgreSQL, Flyway, React et Angular, pipeline GitLab CI avec SonarQube, Testcontainers et JaCoCo, Docker et Kubernetes. Chaque étape relue par des experts de Takima.',
  },
  {
    period: '2026',
    title: 'Formations Kubernetes, GitOps et Helm, puis Apache Kafka',
    organization: 'Takima',
    detail:
      'Deployments, Services, Ingress et TLS, StatefulSets, autoscaling, opérateurs, Argo CD. Puis architecture orientée événements : producteurs, consommateurs, topics.',
  },
  {
    period: '2024',
    title: 'Licence Informatique générale',
    organization: 'Université Paris Cité',
    detail: 'Mention assez bien.',
  },
  {
    period: '2021 – 2023',
    title: 'Journée Francilienne de Programmation',
    organization: 'Concours de programmation',
  },
]

export const skills: SkillGroup[] = [
  {
    name: 'Back-end',
    skills: [
      'Java 21 et 25',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'Spring AI',
      'API REST',
      'OpenAPI',
      'Flyway',
      'Maven',
      'Kafka',
      'Kotlin',
    ],
  },
  {
    name: 'Front-end',
    skills: ['React', 'Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'Angular', 'RxJS', 'HTML et CSS'],
  },
  { name: 'Données', skills: ['PostgreSQL', 'SQL', 'migrations versionnées'] },
  {
    name: 'Tests et qualité',
    skills: ['JUnit 5', 'Mockito', 'Testcontainers', 'SonarQube', 'JaCoCo', 'TDD', 'revue de code'],
  },
  {
    name: 'Livraison',
    skills: [
      'Docker',
      'Docker Compose',
      'Kubernetes',
      'Helm',
      'Argo CD',
      'GitLab CI',
      'GitHub Actions',
      'Keycloak (OAuth2, OpenID Connect)',
      'Linux',
    ],
  },
  {
    name: 'LLM en production',
    skills: ['OpenAI', 'OpenRouter', 'Gemini', 'sorties structurées', 'LangChain'],
  },
  { name: 'Équipe', skills: ['Scrum', 'Kanban', 'Jira', 'Git'] },
]

export const languages = 'Français (langue maternelle), anglais (B2).'

export const testimonial: Testimonial = {
  quote: [
    'Il a rapidement pris en main notre environnement technique : une application en microservices, avec un backend en Java / Spring / Hibernate et un front en React / Next.',
    'Julien a su s’approprier assez vite les outils d’intelligence artificielle appliqués au développement. Il les a utilisés de façon pertinente dans son travail quotidien, ce qui a eu un effet positif sur la vélocité de l’équipe.',
  ],
  author: 'Mathilde Lorrain',
  role: 'Engineering Manager chez Takima, ma tech lead pendant le stage',
  context: 'Extrait de sa lettre de recommandation, octobre 2026',
}
