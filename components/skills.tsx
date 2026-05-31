import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '@/contexts/translationContext';
import {
    SiJavascript, SiTypescript, SiNodedotjs, SiNestjs, SiExpress,
    SiMongodb, SiPostgresql, SiPrisma, SiNextdotjs, SiRedis,
    SiGraphql, SiFirebase, SiDocker, SiKubernetes, SiGit, SiLinux,
} from 'react-icons/si';

const technologies = [
    { name: 'JavaScript', icon: <SiJavascript className="w-full h-full text-yellow-400" />, category: 'frontend' },
    { name: 'TypeScript', icon: <SiTypescript className="w-full h-full text-blue-400" />, category: 'frontend' },
    { name: 'Node.js', icon: <SiNodedotjs className="w-full h-full text-green-500" />, category: 'backend' },
    { name: 'NestJS', icon: <SiNestjs className="w-full h-full text-red-500" />, category: 'backend' },
    { name: 'Express.js', icon: <SiExpress className="w-full h-full text-gray-100" />, category: 'backend' },
    { name: 'MongoDB', icon: <SiMongodb className="w-full h-full text-green-400" />, category: 'database' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="w-full h-full text-blue-400" />, category: 'database' },
    { name: 'Prisma', icon: <SiPrisma className="w-full h-full text-teal-400" />, category: 'database' },
    { name: 'Next.js', icon: <SiNextdotjs className="w-full h-full text-white" />, category: 'frontend' },
    { name: 'Redis', icon: <SiRedis className="w-full h-full text-red-500" />, category: 'database' },
    { name: 'GraphQL', icon: <SiGraphql className="w-full h-full text-pink-500" />, category: 'backend' },
    { name: 'FireBase', icon: <SiFirebase className="w-full h-full text-yellow-500" />, category: 'database' },
    { name: 'Linux', icon: <SiLinux className="w-full h-full text-yellow-500" />, category: 'devops' },
    { name: 'Docker', icon: <SiDocker className="w-full h-full text-blue-400" />, category: 'devops' },
    { name: 'Kubernetes', icon: <SiKubernetes className="w-full h-full text-blue-500" />, category: 'devops' },
    { name: 'Git', icon: <SiGit className="w-full h-full text-orange-500" />, category: 'devops' },
];

const RADAR_DATA = [
    { label: 'Backend', value: 95, color: 'rgba(99,102,241,0.8)' },
    { label: 'Frontend', value: 85, color: 'rgba(168,85,247,0.8)' },
    { label: 'Database', value: 85, color: 'rgba(236,72,153,0.8)' },
    { label: 'DevOps', value: 72, color: 'rgba(20,184,166,0.8)' },
    { label: 'TypeScript', value: 93, color: 'rgba(59,130,246,0.8)' },
    { label: 'System Design', value: 80, color: 'rgba(245,158,11,0.8)' },
];

function polarPoint(cx: number, cy: number, r: number, angleIndex: number, total: number) {
    const angle = (angleIndex / total) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

const RadarChart: React.FC = () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const cx = 220;
    const cy = 220;
    const maxR = 160;
    const levels = 5;
    const N = RADAR_DATA.length;

    const gridPolygons = useMemo(
        () =>
            Array.from({ length: levels }, (_, l) => {
                const r = (maxR / levels) * (l + 1);
                const pts = Array.from({ length: N }, (__, i) => {
                    const p = polarPoint(cx, cy, r, i, N);
                    return `${p.x},${p.y}`;
                }).join(' ');
                return pts;
            }),
        [N]
    );

    const axisLines = useMemo(
        () =>
            Array.from({ length: N }, (_, i) => {
                const end = polarPoint(cx, cy, maxR, i, N);
                return { x1: cx, y1: cy, x2: end.x, y2: end.y };
            }),
        [N]
    );

    const labelPoints = useMemo(
        () =>
            RADAR_DATA.map((d, i) => {
                const pt = polarPoint(cx, cy, maxR + 30, i, N);
                return { ...pt, label: d.label, value: d.value };
            }),
        [N]
    );

    const dataPath = RADAR_DATA.map((d, i) => {
        const r = (d.value / 100) * maxR;
        const p = polarPoint(cx, cy, r, i, N);
        return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
    }).join(' ') + ' Z';

    const dataPoints = RADAR_DATA.map((d, i) => {
        const r = (d.value / 100) * maxR;
        return polarPoint(cx, cy, r, i, N);
    });

    return (
        <div className="flex flex-col items-center gap-6">
            <svg
                viewBox={`0 0 ${cx * 2} ${cy * 2}`}
                className="w-full max-w-md"
                aria-label="Skills radar chart"
            >
                {/* Grid */}
                {gridPolygons.map((pts, l) => (
                    <polygon
                        key={l}
                        points={pts}
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="1"
                    />
                ))}
                {/* Axes */}
                {axisLines.map((line, i) => (
                    <line
                        key={i}
                        {...line}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                    />
                ))}
                {/* Data fill */}
                <path
                    d={dataPath}
                    fill="rgba(99,102,241,0.15)"
                    stroke="rgba(99,102,241,0.6)"
                    strokeWidth="2"
                />
                {/* Data points */}
                {dataPoints.map((pt, i) => (
                    <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r={hovered === i ? 7 : 4}
                        fill={RADAR_DATA[i].color}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    />
                ))}
                {/* Labels */}
                {labelPoints.map((lp, i) => (
                    <text
                        key={i}
                        x={lp.x}
                        y={lp.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="12"
                        fill={hovered === i ? '#a5b4fc' : '#9ca3af'}
                        fontWeight={hovered === i ? '600' : '400'}
                        className="transition-colors duration-200 select-none"
                    >
                        {lp.label}
                    </text>
                ))}
            </svg>

            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
                {RADAR_DATA.map((d, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                            style={{ background: d.color }}
                        />
                        <span className="text-gray-400 group-hover:text-white text-xs transition-colors">
                            {d.label}
                        </span>
                        <span className="text-gray-600 group-hover:text-cyan-400 text-xs transition-colors ml-auto font-mono">
                            {d.value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TechSection: React.FC = () => {
    const { t } = useTranslationContext();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [view, setView] = useState<'grid' | 'radar'>('grid');

    const categories = [
        { id: 'frontend', name: t('skillsSection.categories.frontend'), color: 'from-blue-500 to-cyan-400' },
        { id: 'backend', name: t('skillsSection.categories.backend'), color: 'from-green-500 to-emerald-400' },
        { id: 'database', name: t('skillsSection.categories.database'), color: 'from-orange-500 to-amber-400' },
        { id: 'devops', name: t('skillsSection.categories.devops'), color: 'from-blue-500 to-cyan-400' },
    ];

    const filteredTechnologies = activeCategory
        ? technologies.filter(tech => tech.category === activeCategory)
        : technologies;

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } },
    };

    const item = {
        hidden: { y: 20, opacity: 0, scale: 0.9 },
        show: { y: 0, opacity: 1, scale: 1 },
    };

    return (
        <section id='skills' className="relative py-16 md:py-24 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 min-h-screen flex items-center">
            <div className="absolute inset-0 bg-blue-950 z-0" />
            <div className="container mx-auto px-6 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white text-center"
                >
                    <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
                        {t('skillsTitle')}
                    </span>
                </motion.h2>

                {/* View toggle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-8"
                >
                    <div className="flex bg-white/5 border border-white/10 rounded-full p-1 gap-1">
                        {(['grid', 'radar'] as const).map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    view === v
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {v === 'grid' ? t('skillsSection.gridView') : t('skillsSection.radarView')}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {view === 'grid' ? (
                        <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Category filters */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-wrap justify-center gap-3 mb-16"
                            >
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                                        activeCategory === null
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 border-transparent scale-105'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5'
                                    }`}
                                >
                                    {t('skillsSection.categories.all')}
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                                            activeCategory === category.id
                                                ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-transparent scale-105`
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </motion.div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory || 'all'}
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
                                >
                                    {filteredTechnologies.map((tech) => {
                                        const category = categories.find(c => c.id === tech.category);
                                        return (
                                            <motion.div
                                                key={tech.name}
                                                variants={item}
                                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                                onHoverStart={() => setHoveredTech(tech.name)}
                                                onHoverEnd={() => setHoveredTech(null)}
                                                className="glass-strong rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group border border-white/10 hover:border-cyan-500/30 transition-colors duration-300"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br ${category?.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                                                <motion.div
                                                    className="w-16 h-16 md:w-20 md:h-20 mb-6 relative z-10 flex items-center justify-center drop-shadow-2xl"
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                                >
                                                    {tech.icon}
                                                </motion.div>
                                                <h3 className="text-lg font-bold text-white mb-3 z-10">{tech.name}</h3>
                                                <span className={`text-xs px-3 py-1 rounded-full text-white z-10 bg-gradient-to-r ${category?.color} bg-opacity-20 border border-white/10`}>
                                                    {category?.name || ''}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="radar"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10 max-w-2xl mx-auto"
                        >
                            <RadarChart />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TechSection;
