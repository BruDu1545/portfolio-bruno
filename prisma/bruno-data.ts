// Conteúdo do Bruno (GitHub + LinkedIn). Apaga o conteúdo atual e grava este.
// Rodar: npx tsx --env-file=.env prisma/bruno-data.ts
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const j = JSON.stringify;
const gh = (r: string) => `https://github.com/BruDu1545/${r}`;

async function main() {
  await db.$transaction([
    db.project.deleteMany(),
    db.experience.deleteMany(),
    db.skill.deleteMany(),
    db.education.deleteMany(),
    db.language.deleteMany(),
  ]);

  const profile = {
    name: "Bruno Carletto Adamczyk",
    fullName: "Bruno Carletto Adamczyk",
    role: "Coordenador de TI · Desenvolvimento Web & Automação",
    roleEn: "IT Coordinator · Web Development & Automation",
    summary:
      "Coordeno a TI do Colégio Martin Luther, onde lidero projetos de processos e automação, cuido da infraestrutura de rede e dou suporte a pais e usuários. Comecei como jovem aprendiz e cheguei a coordenador em pouco mais de dois anos. Estudo Sistemas para Internet na UTFPR e gosto de transformar ideias em soluções reais, com eficiência, segurança e boas práticas.",
    summaryEn:
      "I run IT at Colégio Martin Luther, leading process and automation projects, maintaining the network infrastructure and supporting parents and users. I started as a young apprentice and became coordinator in just over two years. I study Internet Systems at UTFPR and enjoy turning ideas into real solutions, with efficiency, security and good practices.",
    openToWork: true,
    email: "adamczykbruno10@gmail.com",
    githubUrl: "https://github.com/BruDu1545",
    linkedinUrl: "https://www.linkedin.com/in/bruno-carletto-adamczyk-493b31311/",
    photoPath: null,
    location: "Marechal Cândido Rondon, PR, Brasil",
    locationEn: "Marechal Cândido Rondon, PR, Brazil",
  };
  await db.profile.upsert({ where: { id: 1 }, update: profile, create: { id: 1, ...profile } });

  const projects = [
    ["Lightbot", "Lightbot", "Jogo educativo sobre lógica de programação, desenvolvido na disciplina de Front-end 2 da UTFPR.", "Educational programming-logic game built for the Front-end 2 course at UTFPR.", ["JavaScript", "HTML", "CSS"], "Lightbot---TSI---UTFPR-TD_BKP"],
    ["Onase", "Onase", "Aplicação web em TypeScript.", "TypeScript web application.", ["TypeScript"], "Onase"],
    ["FitBros", "FitBros", "Aplicativo de treinos e acompanhamento fitness.", "Workout and fitness tracking app.", ["TypeScript"], "FitBros"],
    ["FamilyApp", "FamilyApp", "Aplicativo para organização familiar.", "Family organization app.", ["TypeScript"], "FamilyApp"],
    ["SpaceIQ", "SpaceIQ", "Sistema de reserva de espaços e laboratórios escolares, com calendário e horários pré-reservados por disciplina.", "Booking system for school rooms and labs, with a calendar and subject-based pre-booked slots.", ["PHP"], "SpaceIQ"],
    ["TestCraft", "TestCraft", "Sistema web para criação de provas e testes.", "Web system for building tests and exams.", ["PHP"], "TestCraft"],
    ["Vakinha", "Vakinha", "Site de vaquinha / arrecadação coletiva.", "Crowdfunding website.", ["PHP", "CSS"], "Vakinha"],
    ["Programação Mobile", "Mobile Programming", "Aplicativos Flutter feitos nas disciplinas de programação mobile.", "Flutter apps built in mobile programming courses.", ["Dart", "Flutter"], "Programacao_mobile"],
  ] as const;
  for (const [i, [t, tEn, d, dEn, stack, repo]] of projects.entries()) {
    await db.project.create({
      data: { id: i + 1, title: t, titleEn: tEn, description: d, descriptionEn: dEn, stack: j(stack), stackEn: j(stack), url: gh(repo), order: i },
    });
  }

  const exps = [
    ["Coordenador de TI", "IT Coordinator", "nov. 2025 – atual", "Nov 2025 – present", true,
      ["Lidero projetos de processos e automações da escola.", "Cuido da infraestrutura de rede, servidores e monitoramento.", "Coordeno o suporte a pais, alunos e colaboradores."],
      ["Lead the school's process and automation projects.", "Maintain network infrastructure, servers and monitoring.", "Coordinate support for parents, students and staff."]],
    ["Assistente administrativo", "Administrative Assistant", "mai. 2024 – nov. 2025", "May 2024 – Nov 2025", false,
      ["Atuei no suporte de TI e em rotinas administrativas.", "Comecei a automatizar processos internos."],
      ["Worked on IT support and administrative routines.", "Started automating internal processes."]],
    ["Jovem aprendiz", "Young Apprentice", "set. 2023 – mai. 2024", "Sep 2023 – May 2024", false,
      ["Primeira experiência profissional, com suporte técnico e apoio administrativo."],
      ["First professional role, providing technical support and administrative help."]],
  ] as const;
  for (const [i, [r, rEn, p, pEn, cur, b, bEn]] of exps.entries()) {
    await db.experience.create({
      data: {
        id: i + 1, role: r, roleEn: rEn, company: "Colégio Evangélico Martin Luther",
        location: "Marechal Cândido Rondon, PR", locationEn: "Marechal Cândido Rondon, PR, Brazil",
        period: p, periodEn: pEn, current: cur, bullets: j(b), bulletsEn: j(bEn), order: i,
      },
    });
  }

  const skills: [string, string, string, string, string | null][] = [
    ["HTML", "HTML", "Front-end", "Front-end", null],
    ["CSS", "CSS", "Front-end", "Front-end", null],
    ["JavaScript", "JavaScript", "Front-end", "Front-end", null],
    ["React", "React", "Front-end", "Front-end", "intermediate"],
    ["TypeScript", "TypeScript", "Front-end", "Front-end", "learning"],
    ["PHP", "PHP", "Back-end e dados", "Back-end & data", null],
    ["Python", "Python", "Back-end e dados", "Back-end & data", "intermediate"],
    ["Java", "Java", "Back-end e dados", "Back-end & data", "learning"],
    ["C++", "C++", "Back-end e dados", "Back-end & data", "learning"],
    ["MySQL", "MySQL", "Back-end e dados", "Back-end & data", "intermediate"],
    ["PostgreSQL", "PostgreSQL", "Back-end e dados", "Back-end & data", "intermediate"],
    ["Dart / Flutter", "Dart / Flutter", "Mobile", "Mobile", "learning"],
    ["Docker", "Docker", "Infraestrutura", "Infrastructure", null],
    ["Proxmox", "Proxmox", "Infraestrutura", "Infrastructure", null],
    ["Nginx", "Nginx", "Infraestrutura", "Infrastructure", null],
    ["Zabbix", "Zabbix", "Infraestrutura", "Infrastructure", null],
    ["Grafana", "Grafana", "Infraestrutura", "Infrastructure", null],
    ["Portainer", "Portainer", "Infraestrutura", "Infrastructure", null],
    ["UniFi", "UniFi", "Infraestrutura", "Infrastructure", null],
    ["Agentes de IA", "AI agents", "IA e automação", "AI & automation", null],
    ["Claude Code", "Claude Code", "IA e automação", "AI & automation", null],
    ["Gestão de projetos", "Project management", "Gestão", "Management", null],
    ["Liderança de equipes", "Team leadership", "Gestão", "Management", null],
    ["Google Workspace", "Google Workspace", "Gestão", "Management", null],
  ];
  for (const [i, [n, nEn, g, gEn, level]] of skills.entries()) {
    await db.skill.create({ data: { id: i + 1, name: n, nameEn: nEn, group: g, groupEn: gEn, level, learning: level === "learning", order: i } });
  }

  await db.education.create({
    data: { id: 1, course: "Tecnologia em Sistemas para Internet", courseEn: "Associate Degree in Internet Systems", school: "UTFPR — Campus Toledo", period: "Em andamento", periodEn: "In progress", order: 0 },
  });
  await db.education.create({
    data: { id: 2, course: "Curso técnico", courseEn: "Technical course", school: "Colégio Estadual Eron Domingues", period: "Concluído", periodEn: "Completed", note: "Processos, metodologias ágeis e desenvolvimento de sistemas.", noteEn: "Processes, agile methods and software development.", order: 1 },
  });

  await db.language.create({ data: { id: 1, name: "Português", nameEn: "Portuguese", level: "Nativo", levelEn: "Native", proficiency: 5, order: 0 } });
  await db.language.create({ data: { id: 2, name: "Inglês", nameEn: "English", level: "Intermediário", levelEn: "Intermediate", proficiency: 3, order: 1 } });
}

main().then(() => console.log("ok")).finally(() => db.$disconnect());
