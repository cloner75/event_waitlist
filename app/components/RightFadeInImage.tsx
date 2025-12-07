import { motion } from 'motion/react';

export default function RightFadeInImage() {
  return (
    <motion.img
      width={394}
      height={427}
      alt="screenshot4"
      src="/images/screenshot4.png"
      className="absolute aspect-394/427 object-contain pointer-events-none z-2 overflow-visible top-[70px]  w-[394px] h-[427px]"
      initial={{ right: '-394px', opacity: 0 }}
      whileInView={{ right: '-155px', opacity: 1 }}
      transition={{
        right: {
          duration: 1,
          repeat: 0,
          ease: 'easeInOut',
          delay: 0.5,
        },
      }}
      viewport={{ once: true }}
    />
  );
}
