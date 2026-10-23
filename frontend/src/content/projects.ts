import { testimonial } from './profile'
import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'tima',
    illustration: 'tima',
    title: 'Tima, l’outil de recrutement de Takima',
    summary:
      'Mon stage de fin d’études, sur un logiciel utilisé chaque jour par des recruteurs : LLM en production, sécurité de l’API, et quelques ratés instructifs.',
    tagline:
      'Quatre mois sur un produit en production, utilisé chaque jour par de vrais recruteurs, après deux mois de formation interne. La question qui m’a suivi tout le stage : comment livrer ce qui compte sans casser ce qui marche ?',
    context: 'Stage de fin d’études chez Takima',
    period: 'juin – septembre 2026, après la formation interne',
    role: 'Développeur full-stack dans l’équipe Tima, encadré par une tech lead',
    stack: [
      'Java 25',
      'Spring Boot 3.5',
      'Hibernate',
      'PostgreSQL',
      'Flyway',
      'Kafka',
      'Spring AI',
      'Keycloak',
      'Next.js',
      'React',
      'TypeScript',
      'GitLab CI',
    ],
    links: [],
    sections: [
      {
        heading: 'Le produit',
        blocks: [
          'Tima est un ATS, un logiciel de suivi des candidatures. Un recruteur y crée un poste, y rattache des candidats, puis les fait avancer d’étape en étape : premier contact, entretien de motivation, entretien technique, décision. À chaque étape, les intervenants planifient un rendez-vous, écrivent au candidat à partir de modèles d’e-mails et consignent leur évaluation.',
          'L’API Spring Boot porte toutes les règles métier et les autorisations. Le front Next.js n’est qu’une vue. L’envoi des e-mails est délégué à un service séparé qui lit une file Kafka : si la messagerie ralentit, l’application reste réactive.',
          'Mes utilisateurs étaient mes collègues du pôle recrutement. La boucle entre « il me faudrait ça » et « c’est en production » était courte, et les retours aussi.',
        ],
      },
      {
        heading: 'Faire travailler un LLM sans lui laisser le dernier mot',
        blocks: [
          'Quand un client envoie un besoin par e-mail, un recruteur devait recopier à la main l’intitulé, la durée, la localisation, les compétences. J’ai conçu la création automatique des missions : le courriel et ses pièces jointes sont soumis à un modèle de langage, qui renvoie un brouillon de mission. Les pièces sont archivées sur un stockage compatible S3. Le recruteur vérifie et complète au lieu de tout ressaisir.',
          'La difficulté n’est pas d’appeler le modèle, c’est de discipliner une réponse qui n’est jamais deux fois la même. Le modèle reçoit un schéma JSON dérivé de la classe Java attendue. Si la réponse arrive tronquée, on tente de la réparer avant d’abandonner, et une erreur qui vaut la peine d’être retentée est signalée comme telle.',
          'Même logique pour les comptes rendus d’entretien produits par Gemini pendant les visioconférences : je les récupère par les API Google Meet et Drive, je les découpe en sections et je pré-remplis l’évaluation. Enfin, j’ai rendu le fournisseur de LLM interchangeable par configuration. La bascule d’OpenAI vers OpenRouter s’est faite sans toucher au code, avec un retour arrière possible.',
          'Une règle s’est dégagée au fil des tickets : l’IA pré-remplit le factuel, elle ne donne jamais un avis. Tout ce qui relève du jugement du recruteur reste vide par défaut.',
        ],
      },
      {
        heading: 'La fonctionnalité prête qui ne servait à personne',
        blocks: [
          'C’est aussi sur ces comptes rendus que je me suis le plus planté. J’avais demandé à ma tech lead, qui fait passer des entretiens, quels champs elle voulait voir pré-remplis, j’avais croisé avec d’autres interviewers, et j’avais fini en avance.',
          'Sauf que je n’avais activé les API Meet et Drive qu’en développement. La seule personne qui pouvait le faire en production venait de partir trois semaines en congé. La fonctionnalité a attendu deux semaines pour une demande que j’aurais pu envoyer avant son départ.',
          'Depuis, une fonctionnalité n’est pas finie pour moi tant qu’elle n’est pas déployable. Le code n’est qu’une partie du travail.',
        ],
      },
      {
        heading: 'Sécuriser l’API objet par objet',
        blocks: [
          'Certains points d’entrée étaient réservés aux utilisateurs connectés, mais ne vérifiaient pas que l’utilisateur avait le droit d’agir sur le candidat précis visé. Un contrôle par rôle ne suffit pas : deux recruteurs de même rôle ne suivent pas les mêmes candidats.',
          'J’ai ajouté un contrôle d’accès au niveau de l’objet, avec des gardes réutilisables et une permission dédiée, puis audité tous les points d’entrée concernés pour n’en oublier aucun. J’ai aussi conçu un formulaire d’inscription public pour les freelances : ouvert sans authentification, il n’accepte qu’une liste fermée de champs, pour qu’on ne puisse pas s’attribuer un statut ou un rôle en ajoutant un champ à la requête.',
          'Chaque règle d’accès est accompagnée d’un test qui échoue si on la retire. C’est la seule façon que j’ai trouvée d’être sûr qu’une règle de sécurité existe encore six mois plus tard.',
        ],
      },
      {
        heading: 'Deux prénoms identiques qui ne l’étaient pas',
        blocks: [
          'Un bug de recherche : certains candidats au prénom accentué restaient introuvables. Impossible à reproduire sur mon poste. J’ai soupçonné ma requête, ma machine, l’encodage de la base, et perdu presque une journée.',
          'La cause n’était nulle part dans le code. Unicode autorise deux façons d’écrire « é » : un seul caractère, ou un « e » suivi d’un accent combinant. À l’écran, rien ne les distingue. En mémoire, ce ne sont pas les mêmes octets.',
          {
            language: 'java',
            caption: 'Normaliser avant de retirer les accents : les deux écritures donnent le même résultat.',
            code: 'String normalized = Normalizer.normalize(search, Normalizer.Form.NFD)\n        .replaceAll("\\\\p{InCombiningDiacriticalMarks}", "");',
          },
          'Plutôt qu’une rustine dépendante de l’environnement, j’ai normalisé systématiquement le texte avant de le désaccentuer, et ajouté un test qui éprouve les deux écritures. Je ne regarde plus un champ texte accentué de la même façon.',
        ],
      },
      {
        heading: 'Un client de plus, une seule base de code',
        blocks: [
          'Tima sert plusieurs instances depuis le même code, chacune avec des comportements réglés par configuration. Quand un nouveau client est arrivé, sa demande principale paraissait simple : pouvoir rattacher un candidat à plusieurs postes.',
          'Notre première version a fait apparaître des bugs partout. Le changement touchait le screening, les entretiens, le tableau de bord, la fiche candidat. On a repris la conception à zéro, listé chaque écran concerné, puis repris les écrans un par un. Le chantier a été bien plus lourd qu’annoncé.',
          'La leçon a été inconfortable : sur une évolution aussi transverse, le temps qu’on ne passe pas à cadrer au départ, on le repaie ensuite écran par écran.',
        ],
      },
      {
        heading: 'Ce que j’en retiens',
        blocks: [
          'Ce que je fais bien : entrer vite dans une grosse base de code inconnue, en partant du comportement observable et des tests existants plutôt qu’en lisant ligne à ligne. Tenir la barre sur les tests et la non-régression. Mener une fonctionnalité jusqu’au bout.',
          'Ce que je travaille : mieux estimer la charge d’une tâche, prendre de la hauteur sur l’architecture avant de coder, et penser à la mise en production dès le début plutôt qu’à la fin.',
        ],
      },
    ],
    testimonial,
  },
  {
    slug: 'manguessr',
    title: 'ManGuessr',
    summary:
      'Un jeu de devinettes anime et manga, avec un défi par jour. Le plus difficile : empêcher de tricher avec les outils du navigateur.',
    tagline:
      'Un jeu de devinettes sur l’univers anime et manga, avec un défi par jour, le même pour tout le monde. En ligne, et servi depuis mon Raspberry Pi.',
    context: 'Projet personnel',
    period: '2026',
    role: 'Seul, de la conception à l’exploitation',
    stack: [
      'Java 21',
      'Spring Boot 3',
      'Spring Security (JWT)',
      'Spring Data JPA',
      'PostgreSQL',
      'React',
      'TypeScript',
      'Docker Compose',
      'nginx',
      'GitHub Actions',
    ],
    links: [
      { label: 'Jouer', href: 'https://manguessr.julienhome.com' },
      { label: 'Code source', href: 'https://github.com/Julien94k/manguessr' },
    ],
    image: {
      src: '/images/manguessr-accueil.webp',
      alt: 'Page d’accueil de ManGuessr : le défi du jour, avec la liste des modes de jeu Anime et Manga.',
      width: 1440,
      height: 900,
      kind: 'screen',
    },
    sections: [
      {
        heading: 'Le jeu',
        blocks: [
          'Inspiré d’AniGuessr. Chaque jour, un défi par mode, identique pour tous les joueurs, plus un mode illimité. On reconnaît une œuvre à partir d’images de plus en plus parlantes, on retrouve la série de quatre personnages, on devine un anime à son générique, on déduit un titre par comparaison d’attributs façon Wordle, ou on identifie une jaquette de manga de moins en moins floue.',
          'Autour du jeu : comptes, séries de victoires, classement, statistiques de profil et partage du score.',
        ],
      },
      {
        heading: 'Un moteur de parties qui accepte de nouveaux modes',
        blocks: [
          'Chaque mode implémente la même interface : quelles œuvres il peut tirer, ce que le client a le droit de voir, comment valider une réponse. Le cycle de vie d’une partie et le calcul du score restent au même endroit, et le score est toujours recalculé côté serveur. Ajouter un mode ne touche pas au reste.',
          'Le catalogue vient de trois API publiques, AniList en GraphQL, MangaDex et AnimeThemes, ingérées avec une limite de débit propre à chaque source et un regroupement des saisons d’une même série.',
        ],
      },
      {
        heading: 'Empêcher de tricher avec les outils du navigateur',
        blocks: [
          'Dans un jeu de devinettes, l’URL d’une image ou le nom d’un fichier audio peut donner la réponse. Tous les médias passent donc par un proxy qui délivre des jetons signés : rien dans ce que reçoit le navigateur ne trahit l’œuvre.',
          'Les images sont floutées ou recadrées côté serveur, puis mises en cache sur disque. Le navigateur ne reçoit jamais la version nette avant la fin de la partie.',
        ],
      },
      {
        heading: 'Tenir sur un Raspberry Pi',
        blocks: [
          'Flouter une image coûte cher sur un processeur ARM. J’utilise un flou séparable appliqué en plusieurs passes, qui reste peu coûteux même sur le Pi.',
          'Les images d’une partie sont préparées en arrière-plan dès sa création, et celles du défi du jour dès qu’il est tiré. La première image passe d’environ 0,9 seconde à quelques millisecondes. La liste des modes disponibles est mise en cache : la page d’accueil est passée de 1,6 seconde à 6 millisecondes.',
        ],
      },
      {
        heading: 'Ouvert sur Internet',
        blocks: [
          'Le site passe par un tunnel Cloudflare : il n’a besoin d’aucun port ouvert sur ma box. nginx limite le débit par visiteur (connexion, création de parties, reste de l’API) et pose les en-têtes de sécurité : CSP, HSTS, interdiction d’affichage dans un cadre. Le backend tourne sans les droits root.',
          'Un piège trouvé pendant l’audit : derrière le tunnel, nginx voit toutes les requêtes venir de la même adresse, celle de cloudflared. Une limite de débit par adresse IP aurait bloqué tout le monde d’un coup. Elle se base donc sur l’en-tête CF-Connecting-IP, que Cloudflare écrase et qu’un client ne peut pas falsifier.',
          'Un autre, plus bête : la redirection vers HTTPS reposait sur le schéma de la requête, toujours « http » côté Pi. Résultat, l’accès depuis le réseau local était redirigé et cassé. Elle se base maintenant sur l’en-tête CF-Visitor, absent en accès local.',
          'Le projet compte 263 tests JUnit 5, unitaires et d’intégration, exécutés par GitHub Actions à chaque push.',
        ],
      },
    ],
  },
  {
    slug: 'pianolearn',
    title: 'PianoLearn',
    summary:
      'J’apprends le piano sur un Yamaha P-145. J’ai écrit l’appli qui va avec : le téléphone écoute le vrai clavier branché en USB.',
    tagline:
      'Une appli Android pour apprendre le piano sur un vrai clavier : notes qui tombent, partition, cours, et un serveur sur mon Raspberry Pi qui transforme un enregistrement en morceau jouable.',
    context: 'Projet personnel',
    period: '2026',
    role: 'Seul',
    stack: ['React Native', 'Expo', 'TypeScript', 'Kotlin (module natif)', 'Python', 'Gemini'],
    links: [],
    image: {
      src: '/images/pianolearn-lecteur.webp',
      alt: 'Le lecteur de PianoLearn sur « Lettre à Élise » : partition en haut, notes qui tombent vers un clavier, réglages main droite, main gauche, deux mains.',
      width: 640,
      height: 1360,
      kind: 'phone',
    },
    sections: [
      {
        heading: 'Ce que fait l’appli',
        blocks: [
          'Le piano se branche au téléphone par un câble USB. En jeu libre, les notes jouées s’affichent en direct : nom, portée, accord reconnu, pédale. Le lecteur ouvre un fichier MIDI avec des notes qui tombent et la partition, de 25 à 150 % de la vitesse, en boucle sur un passage, main droite, main gauche ou les deux, avec un mode qui attend la bonne note.',
          'À côté, quatorze modules de cours, du nom des notes jusqu’aux accords et aux rythmes avancés, avec des exercices joués sur le vrai clavier et des révisions espacées dans le temps.',
        ],
      },
      {
        heading: 'Une seule horloge',
        blocks: [
          'Le piège d’une appli de piano, c’est le décalage entre ce qu’on entend et ce qu’on voit. Comme les applis dédiées, PianoLearn n’a qu’une horloge, celle du séquenceur. Sur Android, il tourne dans le fil audio natif, écrit en Kotlin : il joue les notes au moment exact où elles doivent être entendues et donne la position réelle, que l’écran affiche.',
          'Le JavaScript ne s’occupe que des règles, comme le mode attente, la boucle ou le score. La même logique existe en TypeScript pour l’aperçu web et les tests, et les deux doivent rester identiques.',
          'Ce module natif a une conséquence : l’appli ne tourne pas dans Expo Go, il faut construire un APK. Le SDK Android ne s’installe pas sur un Raspberry Pi, alors la compilation passe par le service cloud d’Expo.',
        ],
      },
      {
        heading: 'Transformer un enregistrement en morceau',
        blocks: [
          'On peut envoyer un enregistrement de piano, en MP3, WAV, OGG ou FLAC. Un petit serveur sur mon Raspberry Pi le transcrit en notes avec Basic Pitch, un modèle open source de Spotify, en quelques secondes. Le serveur refuse toute adresse extérieure au réseau local.',
          'Un assistant Gemini répond aux questions de théorie et cherche des morceaux sur des catalogues de fichiers MIDI, puis les adapte au niveau voulu : mélodie seule pour débuter, puis basse, puis seconde voix. Chacun utilise sa propre clé, stockée seulement sur le téléphone.',
        ],
      },
    ],
  },
  {
    slug: 'jobradar',
    illustration: 'jobradar',
    title: 'JobRadar',
    summary:
      'Mon outil de recherche d’emploi : il collecte les offres, les note selon mon profil avec un LLM, et me prévient des meilleures sur mon téléphone.',
    tagline:
      'Une veille d’offres d’emploi auto-hébergée. Elle collecte plusieurs sources, retire les doublons, note chaque offre selon mon profil et suit mes candidatures jusqu’à la réponse.',
    context: 'Projet personnel',
    period: '2026',
    role: 'Seul',
    stack: [
      'Java 21',
      'Spring Boot 3.4',
      'Hibernate',
      'PostgreSQL',
      'Flyway',
      'React',
      'TypeScript',
      'TanStack Query',
      'Testcontainers',
      'Docker Compose',
    ],
    links: [],
    sections: [
      {
        heading: 'Le problème',
        blocks: [
          'Chercher un emploi, c’est relire chaque jour les mêmes annonces sur plusieurs sites, souvent publiées en double. JobRadar interroge les API officielles de France Travail, Adzuna et Jooble selon un calendrier, et ne garde qu’une fois une annonce publiée à plusieurs endroits. Pour les reconnaître, il compare une empreinte de l’entreprise et de l’intitulé, normalisés : accents, mentions H/F, forme juridique.',
          'Mes candidatures se suivent ensuite dans un tableau par étapes, avec notes, dates et rappels de relance.',
        ],
      },
      {
        heading: 'Un LLM, mais pas pour tout',
        blocks: [
          'Envoyer chaque offre à un modèle de langage coûterait cher et irait vite au bout des quotas gratuits. La notation se fait donc en deux temps. D’abord des mots-clés pondérés, gratuits et instantanés : le titre compte double, et une annonce qui exige trop d’années d’expérience est pénalisée. Ensuite, seules les offres prometteuses partent au modèle, par lots de dix, qui renvoie une note, un résumé, des points forts et des points faibles.',
          'Avec un quota gratuit de vingt requêtes par jour, cela couvre deux cents offres. Quand le quota est épuisé, tout s’arrête proprement, et les offres restantes sont notées au passage suivant.',
          'Le client parle le format d’API d’OpenAI : Gemini, OpenRouter ou OpenAI s’échangent par configuration, comme sur Tima. Les réponses sont validées et bornées, et une saturation du fournisseur déclenche des relances espacées.',
        ],
      },
      {
        heading: 'Une source en panne n’arrête pas les autres',
        blocks: [
          'Chaque source implémente la même interface. Une source sans clé est simplement désactivée, une source en erreur n’empêche jamais les autres de tourner. Les appels aux API externes sont testés avec des réponses simulées, et la base avec un vrai PostgreSQL lancé par Testcontainers.',
          'Les meilleures offres déclenchent une notification ntfy sur mon téléphone, avec le lien direct. C’est le même mécanisme qui me prévient quand quelqu’un écrit depuis ce site.',
        ],
      },
    ],
  },
  {
    slug: 'portfolio',
    illustration: 'portfolio',
    title: 'Ce portfolio',
    summary:
      'Le site que vous lisez. Le serveur ne fait que ce qui a besoin d’un serveur : le reste est du HTML pré-généré.',
    tagline:
      'Un portfolio dans la stack de mon stage, où le serveur ne fait que ce qui a besoin d’un serveur. Auto-hébergé, comme le reste.',
    context: 'Projet personnel',
    period: 'octobre 2026',
    role: 'Seul',
    stack: [
      'Java 25',
      'Spring Boot 3.5',
      'Spring Security',
      'Hibernate',
      'PostgreSQL',
      'Flyway',
      'React',
      'TypeScript',
      'TanStack Query',
      'Vite',
      'nginx',
      'Testcontainers',
    ],
    links: [{ label: 'Code source', href: 'https://github.com/Julien94k/portfolio' }],
    sections: [
      {
        heading: 'Le serveur ne sert que ce qui a besoin d’un serveur',
        blocks: [
          'Le contenu d’un portfolio change quelques fois par an. Le servir depuis une base de données à chaque visite aurait ajouté de la mémoire consommée, du code exposé et une page blanche le jour où l’API tombe.',
          'Le texte vit donc dans le code du front. Au build, chaque page est rendue en HTML statique par React : elle s’affiche avant même que le JavaScript soit chargé, et reste en ligne si l’API est arrêtée.',
          'L’API Spring Boot ne s’occupe que du formulaire de contact, de la lecture des messages, et des mesures du Raspberry Pi affichées sur l’accueil. Là, un serveur a une vraie raison d’exister : valider, filtrer, stocker, protéger l’accès, lire la machine.',
        ],
      },
      {
        heading: 'Un formulaire de contact qui ne se fait pas spammer',
        blocks: [
          'Pas d’adresse e-mail en clair sur le site, pour ne pas la donner aux robots. Le formulaire filtre en plusieurs couches. nginx limite le nombre d’envois par visiteur. Un champ invisible piège les robots qui remplissent tout, et un envoi plus rapide qu’un humain est ignoré. Dans les deux cas, l’API répond comme si de rien n’était, pour ne rien leur apprendre. Enfin, un plafond quotidien global empêche de remplir la base en changeant d’adresse.',
          'Quand un message arrive, mon téléphone reçoit une notification ntfy. Elle ne contient ni le nom ni le texte, seulement le lien vers l’administration. Les messages sont supprimés automatiquement au bout d’un an.',
        ],
      },
      {
        heading: 'Tout refuser, puis ouvrir au cas par cas',
        blocks: [
          'Spring Security refuse toute route qui n’est pas explicitement listée. L’administration s’authentifie en HTTP Basic à chaque requête, avec un mot de passe haché en BCrypt et sans session : le navigateur n’envoie jamais d’identifiants de lui-même, il n’y a donc rien à exploiter par CSRF.',
          'Comme sur Tima, chaque règle d’accès a son test : sans identifiants, mauvais mot de passe, route non déclarée, champ ajouté au formulaire pour tenter de marquer un message comme lu. Les tests d’intégration tournent sur un vrai PostgreSQL lancé par Testcontainers, pas sur une base en mémoire qui se comporte autrement.',
          'Côté nginx : politique de sécurité du contenu stricte (aucun script en ligne, aucune ressource tierce, polices comprises), HSTS, refus d’affichage dans un cadre. L’API et la base n’ont aucun port publié.',
        ],
      },
      {
        heading: 'Sobre exprès',
        blocks: [
          'Beaucoup de portfolios se ressemblent aujourd’hui : dégradé violet, cartes arrondies, titres centrés, animations à chaque défilement. J’ai voulu l’inverse. Deux polices choisies pour la lecture, une serif pour les titres et une sans-serif pour le texte, auto-hébergées. Cinq couleurs, aucun dégradé, des liens soulignés. Le texte raconte ce qui a raté autant que ce qui a marché.',
                  'En haut de l’accueil, le Raspberry Pi qui sert le site est dessiné aux proportions de la vraie carte. Ses trois mesures, température, durée depuis le dernier démarrage et charge, sont lues dans /sys et /proc par l’API au moment de la visite. Les projets sans capture montrable ont un schéma dessiné à la main, avec les mêmes couleurs que le reste du site.',
        ],
      },
    ],
  },
]

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
