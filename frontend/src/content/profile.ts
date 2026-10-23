import type { Education, Experience, Skill, Testimonial, Tool } from './types'

export const profile = {
  name: 'Julien Lim',
  role: 'Développeur full-stack Java, Spring Boot et React',
  location: 'Île-de-France',
  intro: [
    'J’ai fait mon stage de fin d’études chez Takima : une formation interne, puis Tima, un logiciel de recrutement en production. J’y ai livré une trentaine de fonctionnalités et de correctifs, dont la création automatique de missions à partir des e-mails clients, analysés par un LLM.',
    'Chez moi, je me fabrique les outils qui me manquent. Je cherche du travail avec un radar d’offres que j’ai écrit, j’apprends le piano avec ma propre appli, et tout ça tourne sur un Raspberry Pi.',
  ],
  availability: 'Je cherche un CDI en développement full-stack en Île-de-France, disponible dès maintenant.',
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

export const skills: Skill[] = [
  {
    name: 'Java et Spring Boot',
    context:
      'Quatre mois en production sur Tima (Java 25, Spring Boot 3.5), après la formation Master 3. Mes projets ManGuessr, JobRadar et ce site.',
  },
  {
    name: 'Spring Security et Keycloak',
    context:
      'Contrôle d’accès objet par objet sur l’API de Tima. Authentification JWT sur ManGuessr. Administration de ce site.',
  },
  {
    name: 'Hibernate, PostgreSQL, Flyway',
    context: 'Tima, ManGuessr, JobRadar et ce site : schéma versionné, de la migration jusqu’à l’écran.',
  },
  {
    name: 'React et TypeScript',
    context:
      'Le front de Tima (Next.js, TanStack Query, Tailwind). ManGuessr, JobRadar, ce site. React Native pour PianoLearn.',
  },
  {
    name: 'Tests',
    context:
      'JUnit 5, Mockito et Testcontainers sur Tima, JobRadar et ce site. 263 tests sur ManGuessr. SonarQube et JaCoCo en CI.',
  },
  {
    name: 'LLM en production',
    context:
      'Spring AI et sorties structurées sur Tima. Notation d’offres par lots dans JobRadar. Assistant Gemini dans PianoLearn.',
  },
  {
    name: 'Docker et intégration continue',
    context:
      'GitLab CI chez Takima. Docker Compose et GitHub Actions sur mes projets web, tous déployés sur mon Raspberry Pi.',
  },
  {
    name: 'Kafka, Kubernetes, Helm, Argo CD',
    context: 'Microservice de notification Kafka sur Tima. Formations Takima pour Kubernetes et GitOps.',
  },
  {
    name: 'Kotlin et Angular',
    context: 'Formation Master 3 : la même marketplace écrite en Java puis en Kotlin, avec un front Angular.',
  },
  { name: 'Méthode', context: 'Scrumban chez Takima : tickets, revue de code, QA, sprints de deux semaines.' },
]

export const tools: Tool[] = [
  {
    title: 'ClipShare',
    description:
      'Pour passer un fichier ou une note de mon téléphone à mon PC sans passer par une messagerie. Une page web sur mon réseau local, mise à jour en direct.',
    stack: 'Python, Flask, WebSocket',
  },
  {
    title: 'zip-solver',
    description:
      'Résout le puzzle Zip de LinkedIn à partir d’une capture d’écran : détection de la grille, des murs et des numéros, puis recherche du chemin.',
    stack: 'Python, traitement d’image, Android',
    image: {
      src: '/images/zip-solver.webp',
      caption: 'Une grille résolue : le chemin passe par les numéros dans l’ordre, sans traverser les murs.',
      width: 314,
      height: 309,
    },
  },
  {
    title: 'gamesolver',
    description:
      'Un bot qui joue à un jeu de type Mahjong à ma place : il lit l’écran, reconstruit le plateau et clique en évitant de perdre.',
    stack: 'Python, vision par ordinateur',
  },
  {
    title: 'AI Radar',
    description:
      'Ma veille sur les modèles d’IA : annonces, prix et performances, avec des sources classées par fiabilité.',
    stack: 'Python, FastAPI, SQLite',
  },
]

export const homelab =
  'Tout tourne sur un Raspberry Pi 5 chez moi, en Docker Compose : ManGuessr et ce site sont publics, derrière un tunnel Cloudflare. Le reste n’est accessible que depuis mon réseau ou par un VPN WireGuard que j’ai monté pour y accéder de l’extérieur.'

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
