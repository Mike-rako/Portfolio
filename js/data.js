/* ==========================================================================
   Contenido del portafolio. Es el unico archivo que se edita para actualizar
   textos, habilidades, experiencia y proyectos. Los campos con {es, en} son
   bilingues; el resto es comun a ambos idiomas.
   ========================================================================== */
window.PORTFOLIO = {
  profile: {
    name: "Michael Barillas",
    role: { es: "Desarrollador de software", en: "Software developer" },
    headline: {
      es: "Backend, automatizacion y procesamiento de datos. Construyo soluciones robustas y mantenibles con codigo limpio.",
      en: "Backend, automation and data processing. I build robust, maintainable solutions with clean code.",
    },
    location: "San Jose, Costa Rica",
    status: {
      es: "disponible para nuevas oportunidades",
      en: "open to new opportunities",
    },
    focus: ["Python", "C#", "SQL", "FastAPI"],
    email: "mdavidbarillas@gmail.com",
    github: "https://github.com/Mike-rako",
    linkedin:
      "https://www.linkedin.com/in/michael-david-barillas-nu%C3%B1ez-b94b9336b/",
    photo: "assets/img/profile.png",
    cv: {
      es: "assets/cv/CV-Michael-Barillas-ES.pdf",
      en: "assets/cv/CV-Michael-Barillas-EN.pdf",
    },
    formspree: "https://formspree.io/f/xdkddbzo",
    about: {
      es: [
        "Soy Michael David Barillas Nunez, desarrollador de software orientado a resultados con experiencia en backend. Transformo requisitos de negocio en soluciones tecnicas eficientes, escalables y mantenibles.",
        "He desarrollado sistemas de gestion, APIs REST y aplicaciones web con Python, C#, SQL y tecnologias web. Mi conocimiento de Linux me permite administrar y optimizar los servidores donde corren las aplicaciones.",
      ],
      en: [
        "I am Michael David Barillas Nunez, a results-oriented software developer with backend experience. I turn business requirements into efficient, scalable and maintainable technical solutions.",
        "I have built management systems, REST APIs and web applications with Python, C#, SQL and web technologies. My Linux knowledge lets me manage and tune the servers where applications run.",
      ],
    },
    soft: {
      es: [
        "Trabajo en equipo",
        "Pensamiento critico",
        "Adaptabilidad",
        "Resolucion de problemas",
        "Proactividad",
        "Gestion del tiempo",
        "Creatividad",
      ],
      en: [
        "Teamwork",
        "Critical thinking",
        "Adaptability",
        "Problem solving",
        "Proactivity",
        "Time management",
        "Creativity",
      ],
    },
  },

  /* Habilidades: un item con "level" se muestra como barra; sin "level", como etiqueta. */
  skills: [
    {
      group: { es: "Lenguajes", en: "Languages" },
      items: [
        { name: "Python", level: 95 },
        { name: "C#", level: 80 },
        { name: "SQL", level: 75 },
        { name: "Java", level: 50 },
      ],
    },
    {
      group: { es: "Desarrollo web", en: "Web development" },
      items: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 80 },
        { name: "JavaScript", level: 70 },
      ],
    },
    {
      group: { es: "Herramientas", en: "Tools" },
      items: [
        { name: "Visual Studio" },
        { name: "VS Code" },
        { name: "MySQL" },
        { name: "SQL Server" },
        { name: "Linux" },
        { name: "Ubuntu Server" },
        { name: "Git" },
      ],
    },
  ],

  /* Experiencia: agregar un objeto nuevo al inicio del arreglo para sumar una entrada. */
  experience: [
    {
      company: "XperttaLegal",
      period: "2024",
      role: {
        es: "Practica profesional: automatizacion de procesos",
        en: "Professional internship: process automation",
      },
      description: {
        es: "Desarrollo de herramientas en Python para extraer y procesar informacion de documentos legales y fuentes publicas, integracion de APIs de inteligencia artificial para clasificar y redactar documentos, y monitoreo automatizado de publicaciones judiciales en Google Cloud Run.",
        en: "Built Python tools to extract and process information from legal documents and public sources, integrated AI APIs to classify and draft documents, and deployed automated monitoring of court publications on Google Cloud Run.",
      },
      tags: ["Python", "PyQt5", "Selenium", "Google Cloud", "Gemini AI"],
      certified: true,
    },
  ],

  /* Proyectos: para agregar uno, copiar un objeto, cambiar sus datos y colocar la imagen en assets/img/projects/.
     categories: filtros en los que aparece. type: etiqueta de la tarjeta. links: [{ type: 'code' | 'demo', url }]. */
  projects: [
    {
      title: {
        es: "Sistema de gestion de verduleria",
        en: "Greengrocer management system",
      },
      type: "client",
      categories: ["professional", "desktop"],
      image: "assets/img/projects/Net.png",
      description: {
        es: "Software de escritorio vendido a un negocio local. Gestiona inventario, ventas y clientes con Windows Forms y SQLite.",
        en: "Desktop software sold to a local business. Manages inventory, sales and customers with Windows Forms and SQLite.",
      },
      stack: ["C#", "Windows Forms", "SQLite", ".NET"],
      links: [{ type: "demo", url: "https://youtu.be/xblCvDeoLQ4" }],
    },
    {
      title: {
        es: "Monitoreo de publicaciones judiciales",
        en: "Court publications monitoring",
      },
      type: "internship",
      categories: ["professional", "backend"],
      image: "assets/img/projects/XperttaLegal.jpg",
      confidential: true,
      description: {
        es: "Pipeline diario en Python que extrae el Boletin Judicial, clasifica registros con Gemini AI y sube un reporte a Google Drive desde Cloud Run.",
        en: "Daily Python pipeline that scrapes the court bulletin, classifies records with Gemini AI and uploads a report to Google Drive from Cloud Run.",
      },
      stack: ["Python", "Selenium", "Gemini AI", "Cloud Run"],
      links: [],
    },
    {
      title: {
        es: "Automatizacion de documentos administrativos",
        en: "Administrative document automation",
      },
      type: "internship",
      categories: ["professional", "backend", "desktop"],
      image: "assets/img/projects/XperttaLegal.jpg",
      confidential: true,
      description: {
        es: "Aplicacion de escritorio que lee archivos Word, extrae campos clave y genera borradores legales con la API de Gemini.",
        en: "Desktop application that reads Word files, extracts key fields and generates legal drafts with the Gemini API.",
      },
      stack: ["Python", "PyQt5", "Gemini AI", "Excel"],
      links: [],
    },
    {
      title: {
        es: "API del Registro Civil de Costa Rica",
        en: "Costa Rica Civil Registry API",
      },
      type: "api",
      categories: ["backend"],
      image: "assets/img/projects/API.png",
      description: {
        es: "API REST con FastAPI que consulta personas por cedula o nombre, incluyendo padres e hijos, con documentacion Swagger.",
        en: "FastAPI REST service that looks up people by ID or name, including parents and children, with Swagger documentation.",
      },
      stack: ["Python", "FastAPI", "Selenium", "REST"],
      links: [
        {
          type: "code",
          url: "https://github.com/Mike-rako/tse-costa-rica-api",
        },
      ],
    },
    {
      title: {
        es: "Sistema de gestion de inventario",
        en: "Inventory management system",
      },
      type: "academic",
      categories: ["backend"],
      image: "assets/img/projects/Net.png",
      description: {
        es: "Aplicacion ASP.NET Core MVC con roles, control transaccional de stock, dashboard con Chart.js y reportes por fecha.",
        en: "ASP.NET Core MVC application with roles, transactional stock control, a Chart.js dashboard and date-based reports.",
      },
      stack: [".NET 8", "C#", "SQL Server", "EF Core"],
      links: [
        {
          type: "code",
          url: "https://github.com/Mike-rako/Sistema-de-Gestion-de-Inventario-ASP.NET",
        },
      ],
    },
    {
      title: { es: "Tienda musical web", en: "Music store website" },
      type: "academic",
      categories: ["web"],
      image: "assets/img/projects/Musica.jpg",
      description: {
        es: "Tienda multipagina con catalogo, filtros por precio y carrito persistente, hecha con JavaScript modular y Bootstrap.",
        en: "Multi-page store with catalog, price filters and a persistent cart, built with modular JavaScript and Bootstrap.",
      },
      stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      links: [
        { type: "code", url: "https://github.com/Mike-rako/musicstore_web" },
      ],
    },
    {
      title: { es: "Auto Clicker", en: "Auto Clicker" },
      type: "automation",
      categories: ["desktop"],
      image: "assets/img/projects/AutoClicker.jpg",
      description: {
        es: "Aplicacion de escritorio con CustomTkinter para automatizar clics en Windows con posicion, intervalo y tipo configurables.",
        en: "Desktop app built with CustomTkinter to automate clicks on Windows with configurable position, interval and click type.",
      },
      stack: ["Python", "CustomTkinter", "Windows"],
      links: [
        { type: "code", url: "https://github.com/Mike-rako/auto-clicker" },
      ],
    },
    {
      title: { es: "Portafolio personal", en: "Personal portfolio" },
      type: "personal",
      categories: ["web"],
      image: "assets/img/projects/Portafolio.png",
      description: {
        es: "Este sitio: JavaScript puro, contenido gestionado desde un solo archivo, dos idiomas y tema claro u oscuro.",
        en: "This site: vanilla JavaScript, content managed from a single file, two languages and light or dark theme.",
      },
      stack: ["HTML", "CSS", "JavaScript"],
      links: [{ type: "code", url: "https://github.com/Mike-rako/portafolio" }],
    },
    {
      title: {
        es: "Asistente de IA Local",
        en: "Local AI Assistant"
      },
      type: "personal",
      categories: ["desktop"],
      image: "assets/img/projects/IA_asistente.png",
      description: {
        es: "Asistente de IA local con modelos de lenguaje, reconocimiento de voz y atajos globales para automatizar tareas desde el escritorio.",
        en: "Local AI assistant with language models, speech recognition, and global shortcuts to automate desktop tasks."
      },
      stack: [
        "Python",
        "llama.cpp",
        "llama-cpp-python",
        "faster-whisper",
        "Tkinter",
        "Keyboard",
        "GGUF"
      ],
      links: [
        {
          type: "code",
          url: "https://github.com/Mike-rako/local-ai-assistant"
        }
      ],
    }
  ],

  /* Textos de la interfaz. */
  ui: {
    es: {
      nav_about: "Sobre mi",
      nav_experience: "Experiencia",
      nav_skills: "Habilidades",
      nav_projects: "Proyectos",
      nav_contact: "Contacto",
      cta_projects: "Ver proyectos",
      cta_cv: "Descargar CV",
      about_t: "Sobre mi",
      soft_t: "Habilidades blandas",
      exp_t: "Experiencia",
      skills_t: "Habilidades",
      proj_t: "Proyectos",
      contact_t: "Contacto",
      contact_p: "Si tienes una oportunidad o un proyecto en mente, escribeme.",
      cat_all: "Todos",
      cat_professional: "Profesional",
      cat_backend: "Backend",
      cat_web: "Web",
      cat_desktop: "Escritorio",
      type_client: "Cliente real",
      type_internship: "Practica profesional",
      type_academic: "Academico",
      type_api: "API REST",
      type_automation: "Automatizacion",
      type_personal: "Personal",
      code: "Ver codigo",
      demo: "Ver demo",
      conf: "Codigo confidencial",
      certified: "Respaldado por certificado oficial de la empresa",
      f_name: "Nombre",
      f_email: "Correo",
      f_msg: "Mensaje",
      f_send: "Enviar mensaje",
      f_sending: "Enviando...",
      f_ok: "Mensaje enviado. Te respondere pronto.",
      f_err: "No se pudo enviar. Intenta de nuevo o escribe a mi correo.",
      rights: "Todos los derechos reservados.",
      foot_tag:
        "Desarrollador de software enfocado en backend y automatizacion.",
      foot_nav: "Navegacion",
      foot_conn: "Conecta conmigo",
      foot_mail: "Correo",
      foot_top: "Volver arriba",
      lang_to: "EN",
      copied: 'Correo copiado',
    },
    en: {
      nav_about: "About",
      nav_experience: "Experience",
      nav_skills: "Skills",
      nav_projects: "Projects",
      nav_contact: "Contact",
      cta_projects: "View projects",
      cta_cv: "Download CV",
      about_t: "About me",
      soft_t: "Soft skills",
      exp_t: "Experience",
      skills_t: "Skills",
      proj_t: "Projects",
      contact_t: "Contact",
      contact_p:
        "If you have an opportunity or a project in mind, get in touch.",
      cat_all: "All",
      cat_professional: "Professional",
      cat_backend: "Backend",
      cat_web: "Web",
      cat_desktop: "Desktop",
      type_client: "Real client",
      type_internship: "Internship",
      type_academic: "Academic",
      type_api: "REST API",
      type_automation: "Automation",
      type_personal: "Personal",
      code: "View code",
      demo: "View demo",
      conf: "Confidential code",
      certified: "Backed by an official certificate from the company",
      f_name: "Name",
      f_email: "Email",
      f_msg: "Message",
      f_send: "Send message",
      f_sending: "Sending...",
      f_ok: "Message sent. I will reply soon.",
      f_err: "Could not send. Try again or email me directly.",
      rights: "All rights reserved.",
      foot_tag: "Software developer focused on backend and automation.",
      foot_nav: "Navigation",
      foot_conn: "Connect",
      foot_mail: "Email",
      foot_top: "Back to top",
      lang_to: "ES",
      copied: 'Email copied',
    },
  },
};
