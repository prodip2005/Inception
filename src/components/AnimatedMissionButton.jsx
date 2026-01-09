import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const MinimalMissionButton = () => {
    return (
        <motion.a
            href="#mission"
            whileHover="hover"
            whileTap="tap"
            className="group relative px-8 py-4 rounded-full font-bold overflow-hidden w-fit"
        >
            <motion.div
                variants={{
                    hover: { scale: 1.05 },
                    tap: { scale: 0.95 }
                }}
                className="absolute inset-0 bg-gradient-to-r from-[#d22f27] to-[#cc0000] rounded-full"
            />

            {/* Magnetic Hover Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ff0000] to-[#ff4444] rounded-full opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
            />

            <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-xs text-white">
                Our Mission
                <motion.span
                    variants={{
                        hover: { x: 5 },
                        tap: { x: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <FaArrowRight />
                </motion.span>
            </span>
        </motion.a>
    );
};