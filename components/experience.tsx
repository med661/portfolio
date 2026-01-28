import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCheckCircle, FaRegEye, FaArrowLeft, FaArrowRight, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslationContext } from '../contexts/translationContext';
import { MEETUP_IMAGES } from '../constants/data';

// Define types for clarity and type safety
interface MeetupImage {
    src: string;
    alt: string;
}

interface Project {
    key: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
}

interface ModalContent {
    type: 'project' | 'meetup';
    data: Project | MeetupImage[];
    initialIndex?: number;
}

const Experience = () => {
    const { t } = useTranslationContext();

    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [currentMeetupIndex, setCurrentMeetupIndex] = useState(0);

    const meetupImages: MeetupImage[] = MEETUP_IMAGES.map(img => ({
        src: img.src,
        alt: t(img.altKey)
    }));

    // Order jobs: Formationnet (job2) first, then Dar Blockchain (job1)
    const jobsConfig = [
        {
            key: 'job2',
            projectKeys: ['project1']
        },
        {
            key: 'job1',
            projectKeys: ['project1', 'project2', 'project3']
        }
    ];

    const getProjectData = (jobKey: string, projectKey: string): Project => {
        const baseKey = `experiences.${jobKey}.projects.${projectKey}`;
        const path = t(`${baseKey}.image`);
        const techs = t(`${baseKey}.technologies`);
        const link = t(`${baseKey}.link`);
        return {
            key: `${jobKey}-${projectKey}`,
            title: t(`${baseKey}.title`),
            description: t(`${baseKey}.description`),
            image: path && typeof path === 'string' && path.startsWith('/') ? path : '/images/placeholder.png',
            technologies: typeof techs === 'string' ? techs.split(',').map((tech: string) => tech.trim()) : [],
            link: link && typeof link === 'string' && link.startsWith('http') ? link : undefined,
        };
    };

    const jobs = jobsConfig.map(jobConfig => ({
        key: jobConfig.key,
        title: t(`experiences.${jobConfig.key}.title`),
        company: t(`experiences.${jobConfig.key}.company`),
        date: t(`experiences.${jobConfig.key}.date`),
        logo: t(`experiences.${jobConfig.key}.logo`), // Retrieve logo from translation
        projects: jobConfig.projectKeys.map(pKey => getProjectData(jobConfig.key, pKey))
    }));


    const openProjectModal = (project: Project) => {
        setModalContent({ type: 'project', data: project });
    };

    const openMeetupModal = (index: number) => {
        setModalContent({ type: 'meetup', data: meetupImages, initialIndex: index });
        setCurrentMeetupIndex(index); // Set initial index for carousel
    };

    const closeModal = () => {
        setModalContent(null);
        setCurrentMeetupIndex(0); // Reset index on close
    };

    const nextMeetup = () => {
        if (modalContent?.type === 'meetup' && Array.isArray(modalContent.data)) {
            const newIndex = (currentMeetupIndex + 1) % modalContent.data.length;
            setCurrentMeetupIndex(newIndex);
        }
    };

    const prevMeetup = () => {
        if (modalContent?.type === 'meetup' && Array.isArray(modalContent.data)) {
            const newIndex = (currentMeetupIndex - 1 + modalContent.data.length) % modalContent.data.length;
            setCurrentMeetupIndex(newIndex);
        }
    };


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const techVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };


    return (
        <section id="experience" className="relative py-16 md:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center">
            {/* Existing background - DO NOT CHANGE */}
            <div className="absolute inset-0 bg-gray-900 opacity-90 z-0" />
            
            {/* Timeline Line */}
            <div className="absolute start-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent hidden md:block"></div>

            <div className="container mx-auto px-4 z-10 max-w-6xl">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 md:mb-20 text-white text-center relative animate-fadeIn">
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        {t('experiences.title')}
                    </span>
                </h2>

                <div className="space-y-16 relative">
                    {jobs.map((job, jobIndex) => (
                        <motion.div
                            key={job.key}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={containerVariants}
                            className="relative"
                        >
                            {/* Timeline Dot */}
                            <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-gray-900 z-20 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>

                            <div className="glass-strong p-6 md:p-8 rounded-2xl relative mx-auto w-full border border-white/10 hover:border-indigo-500/30 transition-colors duration-300">
                                {/* Job Header */}
                                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-6">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                                            {job.title}
                                        </h3>
                                        <div className="text-lg md:text-xl text-indigo-300 font-medium mb-2 flex items-center gap-2">
                                            {job.company}
                                        </div>
                                        <time className="inline-block px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs font-mono border border-white/5">
                                            {job.date}
                                        </time>
                                    </div>
                                    {job.logo && job.logo.startsWith('/') && (
                                        <motion.div
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                            className="ms-auto sm:ms-0 bg-white/5 p-2 rounded-lg backdrop-blur-sm border border-white/10"
                                        >
                                            <Image
                                                src={job.logo}
                                                alt={`${job.company} Logo`}
                                                width={80}
                                                height={60}
                                                className="object-contain sm:w-[100px] sm:h-[60px]"
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Projects List */}
                                <div className="space-y-6">
                                    {job.projects.map((project, index) => (
                                        <motion.div
                                            key={project.key}
                                            variants={itemVariants}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-black/20 p-6 rounded-xl hover:bg-black/30 transition-all duration-300 border border-white/5 hover:border-indigo-500/30 group"
                                        >
                                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                                <div className="flex-1 order-2 md:order-1">
                                                    <h4 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                                        {project.title}
                                                    </h4>
                                                    <ul className="space-y-2 text-gray-300 text-sm md:text-base leading-relaxed">
                                                        <li>
                                                            <FaCheckCircle className="inline-block text-indigo-500 mr-2 align-top mt-1 flex-shrink-0" />
                                                            <span>{project.description}</span>
                                                        </li>
                                                    </ul>

                                                    {/* Technologies */}
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {project.technologies.map((tech: string, techIndex: number) => (
                                                            <motion.span
                                                                key={techIndex}
                                                                variants={techVariants}
                                                                transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                                                                className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-medium"
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>

                                                    {/* Link Button */}
                                                    {project.link && (
                                                        <div className="mt-5">
                                                            <a
                                                                href={project.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors duration-300 border-b border-indigo-500/30 hover:border-indigo-400 pb-0.5"
                                                            >
                                                                {t('myprojects.visitProject') || t('common.view')} <FaExternalLinkAlt className="text-xs" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Project Image */}
                                                <div className="flex-shrink-0 flex items-center justify-center md:justify-end order-1 md:order-2 w-full md:w-auto">
                                                    <motion.div
                                                        className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg border border-white/10"
                                                        onClick={() => openProjectModal(project)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Image
                                                            src={project.image}
                                                            alt={`Preview of ${project.title}`}
                                                            width={180}
                                                            height={110}
                                                            style={{ objectFit: 'cover', aspectRatio: '16/10' }}
                                                            className="transition-transform duration-500 group-hover:scale-110"
                                                            priority={index < 2} // Prioritize loading for first few items
                                                            loading={index < 2 ? "eager" : "lazy"}
                                                            quality={85}
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                                                            <FaRegEye className="text-white text-2xl drop-shadow-lg" />
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Meetups Section */}
                <div className="mt-24 mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                            {t('experiences.meetups.title')}
                        </span>
                    </h3>
                    <motion.div
                        className="relative h-56 md:h-72 flex justify-center items-center perspective-1000"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {meetupImages.map((image, index) => {
                            const baseRotation = -6 + (index * 12);
                            const offset = (meetupImages.length - 1) * 40;
                            return (
                                <motion.div
                                    key={index}
                                    className="absolute w-48 h-32 md:w-64 md:h-44 cursor-pointer rounded-xl shadow-2xl border-4 border-white/10 overflow-hidden transform-gpu"
                                    initial={{
                                        rotate: baseRotation,
                                        x: -offset + (index * 80),
                                        scale: 0.9,
                                        opacity: 0
                                    }}
                                    animate={{
                                        rotate: baseRotation,
                                        x: -offset + (index * 80),
                                        scale: 1,
                                        opacity: 1
                                    }}
                                    whileHover={{
                                        scale: 1.15,
                                        rotate: 0,
                                        zIndex: 20,
                                        transition: { duration: 0.3 }
                                    }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    onClick={() => openMeetupModal(index)}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(max-width: 768px) 200px, 300px"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {modalContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative glass-strong p-0 rounded-2xl w-full max-w-5xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                    onClick={closeModal}
                                    className="absolute top-4 end-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-500/80 transition-all duration-300 backdrop-blur-sm z-30"
                                    aria-label="Close modal"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>

                            <div className="p-6 md:p-8">
                                {modalContent.type === 'project' && modalContent.data && !Array.isArray(modalContent.data) && (
                                    <div className="flex flex-col gap-6">
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10">
                                            <Image
                                                src={(modalContent.data as Project).image}
                                                alt={`Preview of ${(modalContent.data as Project).title}`}
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <h3 className="text-2xl font-bold text-white">{(modalContent.data as Project).title}</h3>
                                            {(modalContent.data as Project).link && (
                                                <a
                                                    href={(modalContent.data as Project).link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/30"
                                                >
                                                    {t('myprojects.visitProject') || t('common.view')} <FaExternalLinkAlt className="text-sm" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {modalContent.type === 'meetup' && Array.isArray(modalContent.data) && (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentMeetupIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={modalContent.data[currentMeetupIndex].src}
                                                    alt={modalContent.data[currentMeetupIndex].alt}
                                                    fill
                                                    className="object-contain"
                                                    priority
                                                />
                                            </motion.div>
                                        </AnimatePresence>

                                        {modalContent.data.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); prevMeetup(); }}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-indigo-600 transition-all duration-300 backdrop-blur-sm z-20"
                                                >
                                                    <FaArrowLeft />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); nextMeetup(); }}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-indigo-600 transition-all duration-300 backdrop-blur-sm z-20"
                                                >
                                                    <FaArrowRight />
                                                </button>
                                            </>
                                        )}

                                        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                            <p className="text-white text-lg font-medium text-center">
                                                {modalContent.data[currentMeetupIndex].alt}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Experience;
