import { motion } from 'motion/react';

export default function BottomFadeInImage() {
  return (
    <motion.img
      width={394}
      height={427}
      alt="screenshot4"
      src="/images/screenshot4.png"
      className="pointer-events-none z-3 xl:block hidden  w-[35vh] aspect-auto  absolute bottom-[-7%] left-[2cqw] object-contain max-w-[398px]"
      initial={{ bottom: '-200px', opacity: 0 }}
      whileInView={{ bottom: '-80px', opacity: 1 }}
      transition={{
        bottom: {
          duration: 1,
          repeat: 0,
          ease: 'easeInOut',
          delay: 2.5,
        },
      }}
    />
  );
}
