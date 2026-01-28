import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export const CONTACT_INFO = {
    email: {
        labelKey: 'contact.email',
        value: 'salahsfar.pro@gmail.com',
        href: 'mailto:salahsfar.pro@gmail.com',
    },
    phone: {
        labelKey: 'contact.phone',
        value: '+216 58962808',
        href: 'tel:+21658962808',
    },
    github: {
        labelKey: 'contact.github',
        value: 'github.com/med661',
        href: 'https://github.com/med661',
    },
    linkedin: {
        labelKey: 'contact.linkedin',
        value: 'Salah sfar',
        href: 'https://www.linkedin.com/in/salah-sfar',
    }
};

export const PROJECTS_DATA = [
    {
        key: 'learnHub',
        image: "/images/elhub.png",
        technologies: ["NestJS", "GraphQL", "PostgreSQL", "TypeORM", "Redux Thunk"],
        link: "https://knowledgehubster.vercel.app/",
        color: "from-blue-600 to-blue-400"
    },
    {
        key: 'jobHuntDiary',
        image: "/images/hunt.png",
        technologies: ["Node.js","React.js","ExpressJS","Mongodb", "Redux Thunk"],
        link: "https://job-hunt-diary.vercel.app/",
        color: "from-emerald-500 to-teal-500" ,
    },
    {
        key: 'realtimeChat',
        image: "/images/chat.png",
        technologies: ["NestJS", "TypeScript", "Prisma", "React.js", "Redux Thunk"],
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7163459271488180224/",
        color: "from-pink-600 to-pink-400"
    },
    {
        key: 'portfolio',
        image: "/images/portfolio.png",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "i18next", "React"],
        link: "/",
        color: "from-indigo-600 to-indigo-400"
    },
    {
        key: 'ecommerceBackend',
        image: "/images/ec.jpeg",
        technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "AWS S3", "REST API"],
        link: "https://github.com/med661/ecommerce-backend",
        color: "from-amber-600 to-amber-400"
    },
];

export const MEETUP_IMAGES = [
    { src: "/eximages/dar.jpg", altKey: "experiences.meetups.meetup1" },
    { src: "/eximages/li.jpg", altKey: "experiences.meetups.meetup2" },
];

export const ACCOMPLISHMENTS_DATA = {
    formationnet: {
        instagram: "https://www.instagram.com/formationnet",
        linkedin: "https://www.linkedin.com/company/75032139",
    }
};

export const INTERNSHIPS_DATA = [
    {
        key: 'gpro',
        company: "Gpro Consulting",
        project: "SkillsyncEduct",
        tech: "React Js, Node JS, Express JS, Redux-Toolkit, Mongoose, Git, OAuth 2.0, Cloudinary",
        color: "from-blue-600 to-blue-400",
        // period and description are translatable
    },
    {
        key: 'satoripop',
        company: "Satoripop",
        project: "Premier League App",
        tech: "React Native, Firebase, Express JS, Node JS",
        color: "from-purple-600 to-purple-400",
    }
];
