import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCheckCircle, FaRegEye, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useTranslationContext } from '../contexts/translationContext';

// Define types for clarity and type safety
interface MeetupImage {
    src: string;
    alt: string;
}

interface Project {
    key: string; // Use the key to fetch translation data
    title: string; // Derived from translation
    description: string; // Derived from translation
    image: string; // Derived from translation
    technologies: string[]; // Derived from translation
    // Add link if available in translation data? (Assuming not based on original code)
}

interface ModalContent {
    type: 'project' | 'meetup';
    data: Project | MeetupImage[]; // Project object or array of MeetupImage for carousel
    initialIndex?: number; // For meetup carousel
}

const Experience = () => {
    const { t, changeLanguage } = useTranslationContext();
    const isFirstRender = useRef(true);

    // Use a single state for modal content
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [currentMeetupIndex, setCurrentMeetupIndex] = useState(0); // Track index for meetup carousel

    useEffect(() => {
        if (isFirstRender.current) {
            // Initial language change only on first render
            changeLanguage("en");
            isFirstRender.current = false;
        }
    }, [changeLanguage]);

    // Meetup images data
    const meetupImages: MeetupImage[] = [
        { src: "/eximages/dar.jpg", alt: "Meetup 1: Darblochain Event" }, // Added more descriptive alt
        { src: "/eximages/li.jpg", alt: "Meetup 2: LinkedIn Local Meeting" }, // Added more descriptive alt
        // Add more meetup images here if needed
    ];

    const projectKeys = ['project1', 'project2', 'project3'];

    // Helper function to retrieve project data from translation
    const getProjectData = (key: string): Project => {
        const path = t(`experiences.job1.projects.${key}.image`);
        const techs = t(`experiences.job1.projects.${key}.technologies`);
        return {
            key: key,
            title: t(`experiences.job1.projects.${key}.title`),
            description: t(`experiences.job1.projects.${key}.description`),
            image: path && typeof path === 'string' && path.startsWith('/') ? path : '/images/placeholder.png',
            technologies: typeof techs === 'string' ? techs.split(',').map(tech => tech.trim()) : [],
        };
    };

    // Get all project data
    const projects: Project[] = projectKeys.map(key => getProjectData(key));


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

            <div className="container mx-auto px-4 z-10 max-w-6xl"> {/* Increased max-width slightly */}
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-white text-center relative animate-fadeIn">
                    <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        {t('experiences.title')}
                    </span>
                </h2>

                {/* Main Experience Card */}
                <motion.div
                     initial="hidden"
                     animate="visible"
                     variants={containerVariants}
                    className="bg-gray-800/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl relative mx-auto w-full border border-gray-700/50"
                >
                    {/* Job Header */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                                {t("experiences.job1.title")}
                            </h3>
                            <div className="text-lg md:text-xl text-gray-300 mb-2">{t("experiences.job1.company")}</div>
                            <time className="block text-gray-400 text-sm">Nov 2022 – Jan 2025</time>
                        </div>
                        {/* Company Logo - Updated for mobile right alignment */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ scale: 1.05 }} 
                            transition={{ duration: 0.2 }}
                            className="ml-auto sm:ml-0"
                        >
                            <Image
                                src="/images/assetdar.png"
                                alt="Darblochain Logo"
                                width={80}  // Smaller size for mobile
                                height={60}
                                className="object-contain rounded-md sm:w-[120px] sm:h-[80px]" // Original size for desktop
                            />
                        </motion.div>
                    </motion.div>

                    {/* Projects List */}
                    <div className="space-y-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.key}
                                variants={itemVariants}
                                transition={{ delay: index * 0.1 }} // Stagger project entry
                                className="bg-gray-700/40 p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/30 hover:border-indigo-500/50 shadow-lg"
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center"> {/* Align items top */}
                                    <div className="flex-1 order-2 md:order-1"> {/* Order text before image on smaller screens */}
                                        <h4 className="text-lg md:text-xl font-semibold text-white mb-3">
                                            {project.title}
                                        </h4>
                                        <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                                            {/* Descriptions - assuming one per project */}
                                            <li>
                                                <FaCheckCircle className="inline-block text-indigo-400 mr-2 align-top mt-1" /> {/* Use a slightly different color */}
                                                <span>{project.description}</span>
                                            </li>
                                        </ul>

                                        {/* Technologies */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {project.technologies.map((tech: string, techIndex: number) => (
                                                <motion.span
                                                    key={techIndex}
                                                    variants={techVariants} // Stagger tech pills within project
                                                    transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                                                    className="px-3 py-1 bg-teal-600/20 text-teal-300 rounded-full text-xs font-medium hover:bg-teal-600/30 transition-colors duration-300"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Image / View Details Trigger */}
                                    <div className="flex-shrink-0 flex items-center justify-center md:justify-end order-1 md:order-2 w-full md:w-auto"> {/* Ensure image is centered on small screens */}
                                        <motion.div
                                            className="relative cursor-pointer group bg-gray-800/50 p-3 md:p-4 rounded-lg transition-transform duration-300 hover:scale-105 shadow-md border border-gray-700/30"
                                            onClick={() => openProjectModal(project)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={`Preview of ${project.title}`}
                                                width={160} // Adjusted size slightly
                                                height={100} // Adjusted size slightly
                                                style={{ objectFit: 'cover', aspectRatio: '16/10' }} // Maintain aspect ratio
                                                className="rounded-md border border-gray-600/20"
                                            />
                                            {/* Hover Overlay and Icon */}
                                            <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {/* Changed icon to indicate "View" or "Details" */}
                                                <FaRegEye className="text-white text-2xl drop-shadow-lg" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Meetups Section */}
                    <div className="mt-16 mb-8">
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-10 text-center"> {/* Increased bottom margin */}
                            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                                Meetups
                            </span>
                        </h3>
                        {/* Meetup Image Stack/Carousel Trigger */}
                        <motion.div
                            className="relative h-48 md:h-64 flex justify-center items-center" // Increased height slightly for visual impact
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: projects.length * 0.1 + 0.3, duration: 0.5 }} // Stagger after projects
                        >
                            {meetupImages.map((image, index) => {
                                const baseRotation = -10 + (index * 10); // Adjusted rotation spread
                                const offset = (meetupImages.length - 1) * 60; // Adjusted offset for better spread
                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute w-32 h-32 md:w-48 md:h-48 cursor-pointer rounded-lg shadow-xl border border-white/10 overflow-hidden"
                                        initial={{
                                            rotate: baseRotation,
                                            x: -offset + (index * 120), // Adjusted horizontal spread
                                            scale: 0.8,
                                            opacity: 0
                                        }}
                                        animate={{
                                            rotate: baseRotation,
                                            x: -offset + (index * 120),
                                            scale: 1, // Slightly larger default scale
                                            opacity: 1
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 10, // Bring to front on hover
                                            transition: { duration: 0.3 }
                                        }}
                                         transition={{ delay: projects.length * 0.1 + 0.3 + (index * 0.1) }} // Stagger meetup images
                                        onClick={() => openMeetupModal(index)}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(max-width: 768px) 150px, 200px"
                                            className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                        />
                                        {/* Overlay to hint at interactivity */}
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <FaRegEye className="text-white text-xl" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                </motion.div>
            </div>

            {/* Enhanced Image/Detail Modal */}
            <AnimatePresence>
                {modalContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto" // Added overflow-y-auto
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }} // Adjusted spring physics
                            className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-4 sm:p-6 rounded-2xl w-full max-w-5xl border border-gray-700/50 shadow-2xl flex flex-col" // Adjusted padding, width, border
                            onClick={e => e.stopPropagation()} // Prevent clicks inside modal from closing
                        >
                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeModal}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm z-20"
                                aria-label="Close modal"
                            >
                                <FaTimes className="w-4 h-4 sm:w-5 h-5" />
                            </motion.button>


                            {modalContent.type === 'project' && modalContent.data && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <motion.div
                                        className="relative w-full h-full max-w-4xl max-h-[90vh]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        <Image
                                             src={(modalContent.data as Project).image}
                                          alt={`Preview of ${(modalContent.data as Project).title}`}
                                          width={1200}  // Added width property
                                          height={800}  // Added height property
                                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
                                          className="object-contain rounded-lg"
                                          priority
                                        />
                                    </motion.div>
                                </div>
                            )}

                            {modalContent.type === 'meetup' && Array.isArray(modalContent.data) && (
                                // Meetup Carousel View
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl group flex items-center justify-center">
                                    <AnimatePresence mode="wait"> {/* Use mode="wait" for sequential animation */}
                                        <motion.div
                                            key={currentMeetupIndex} // Key change triggers animation
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex items-center justify-center" // Center the image within the container
                                        >
                                             <Image
                                                src={modalContent.data[currentMeetupIndex].src}
                                                alt={modalContent.data[currentMeetupIndex].alt}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 700px"
                                                quality={100}
                                                className="object-contain rounded-xl" // object-contain is better for varying image sizes
                                                priority // Load the first image fast
                                            />
                                            <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 shadow-md" /> {/* Subtle border */}
                                        </motion.div>
                                    </AnimatePresence>

                                     {/* Meetup Nav Buttons */}
                                    {modalContent.data.length > 1 && (
                                        <>
                                            <motion.button
                                                whileHover={{ scale: 1.1, x: -5 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => { e.stopPropagation(); prevMeetup(); }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                                                aria-label="Previous meetup image"
                                            >
                                                <FaArrowLeft className="w-5 h-5" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1, x: 5 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => { e.stopPropagation(); nextMeetup(); }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                                                aria-label="Next meetup image"
                                            >
                                                <FaArrowRight className="w-5 h-5" />
                                            </motion.button>
                                        </>
                                    )}

                                    {/* Meetup Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-xl">
                                        <motion.div
                                            key={currentMeetupIndex + '_info'} // Key change triggers animation for text
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center justify-between"
                                        >
                                            <h3 className="text-base sm:text-lg font-medium">
                                                {modalContent.data[currentMeetupIndex].alt}
                                            </h3>
                                            {modalContent.data.length > 1 && (
                                                <div className="text-gray-400 text-xs sm:text-sm">
                                                    {currentMeetupIndex + 1} / {modalContent.data.length}
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Experience;