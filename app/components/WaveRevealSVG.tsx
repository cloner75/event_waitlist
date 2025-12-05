'use client';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export function WaveRevealSVG() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  return (
    <div
      className="w-screen flex justify-center mt-5 relative bg-center bg-no-repeat xl:hidden"
      ref={ref}
    >
      <motion.div
        initial={{ width: '100%' }}
        animate={isInView ? { width: '0%' } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-0 z-2 right-0 h-full"
        style={{ backgroundColor: '#161616' }}
      ></motion.div>

      <Image
        alt=""
        className="w-full h-auto"
        src="/images/vector.svg"
        width={700}
        height={700}
      />

      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-3 w-full max-w-[335px] mx-auto text-center leading-[38px] text-white text-[32px] font-normal ">
        This isn’t another random app—this is about <b>ME and MY CITY.</b>
      </p>
    </div>
  );
}
