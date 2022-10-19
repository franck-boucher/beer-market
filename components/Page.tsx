import { motion } from "framer-motion";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div exit={{ opacity: 0 }} animate="animate" initial="initial">
      {children}
    </motion.div>
  );
}
