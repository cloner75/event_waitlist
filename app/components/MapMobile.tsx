'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
export default function MapMobile() {
  const parentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ['0 1', '1 0'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const girlLeft = useTransform(scrollYProgress, [0, 1], [100, 45]);
  const girlTop = useTransform(scrollYProgress, [0, 1], [256, 350]);

  const boy1Left = useTransform(scrollYProgress, [0, 1], [100, 25]);
  const boy1Top = useTransform(scrollYProgress, [0, 1], [50, 150]);

  const girl2Top = useTransform(scrollYProgress, [0, 1], [150, 70]);
  const girl2Right = useTransform(scrollYProgress, [0, 1], [100, 60]);

  const boy2Right = useTransform(scrollYProgress, [0, 1], [100, 45]);
  const boy2Top = useTransform(scrollYProgress, [0, 1], [220, 370]);

  const height = useTransform(scrollYProgress, [0, 1], [256, 382]);
  const width = useTransform(scrollYProgress, [0, 1], [119, 176]);
  const leftX = useTransform(scrollYProgress, [1, 0], ['-200px', '0px']);
  const rightX = useTransform(scrollYProgress, [1, 0], ['200px', '0px']);

  return (
    <div className="xl:hidden block">
      <div ref={parentRef} className="h-full w-full relative z-3 xl:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            scale: { duration: 1, ease: 'easeOut', delay: 0.5, repeat: 0 },
          }}
          className="fade-up absolute left-1/2 -translate-x-1/2 leading-[60px] font-black top-[50px] text-white text-center max-w-[250px] text-[48px]"
        >
          Dopins
          <br /> are just
          <br /> beginning
          <div className="text-[16px] font-light w-[250px] -mt-2.5 ">
            Where Every Location Has a Story
          </div>
        </motion.div>
        {/* girl2 */}
        <motion.img
          src="/images/2.jpg"
          className="z-1 absolute rounded-[14px] w-12 aspect-auto"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          animate={{ y: [-0, -12, 0] }}
          viewport={{ once: true }}
          transition={{
            scale: { duration: 1, ease: 'easeOut', delay: 1, repeat: 0 },
            y: {
              duration: 7,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }}
          style={{ right: girl2Right, top: girl2Top }}
        />

        {/* boy2 */}
        <motion.img
          src="/images/3.jpg"
          className="z-1 absolute rounded-[14px]  w-12 aspect-auto "
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          animate={{ y: [-0, -12, 0] }}
          transition={{
            scale: { duration: 1, ease: 'easeOut', delay: 1, repeat: 0 },
            y: {
              duration: 8,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }}
          style={{
            top: boy2Top,
            right: boy2Right,
          }}
          viewport={{ once: true }}
        />
        {/* boy1 */}
        <motion.img
          viewport={{ once: true }}
          src="/images/5.jpg"
          className="z-1 absolute rounded-[14px]  w-12 aspect-auto "
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          animate={{ y: [-0, -12, 0] }}
          transition={{
            scale: { duration: 1, ease: 'easeOut', delay: 1, repeat: 0 },
            y: {
              duration: 9,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }}
          style={{
            left: boy1Left,
            top: boy1Top,
          }}
        />
        {/* girl */}
        <motion.img
          viewport={{ once: true }}
          src="/images/6.jpg"
          className="z-1 absolute rounded-[14px] w-12 aspect-auto"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          animate={{ y: [-0, -12, 0] }}
          transition={{
            scale: { duration: 1, ease: 'easeOut', delay: 1, repeat: 0 },
            y: {
              duration: 6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }}
          style={{
            left: girlLeft,
            top: girlTop,
          }}
        />

        <motion.img
          src="/images/logo-pin.png"
          className="z-1 absolute top-[150px] w-20 aspect-auto right-3 "
        />
        <motion.img
          src="/images/logo-pin.png"
          className="z-1 absolute top-60 w-20 aspect-auto left-3"
        />

        <motion.img
          src="/images/logo-pin.png"
          className="z-1 absolute top-[270px] w-20 aspect-auto left-1/2 -translate-x-1/2 "
        />
        <div className="absolute top-[600px] w-full left-0">
          {/* عکس چپ */}
          <motion.img
            src="/images/screenshot1.jpg"
            className="image_shadow absolute  w-[119px] h-64 rounded-[27px] left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ scale, x: leftX }}
          />
          {/* عکس راست */}
          <motion.img
            src="/images/screenshot3.png"
            className="image_shadow absolute  w-[119px] h-64 rounded-[27px] left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ scale, x: rightX }}
          />
          <motion.img
            src="/images/screenshot2.jpg"
            className="image_shadow absolute aspect-119/256 w-44 h-[382px] left-1/2 -translate-x-1/2 rounded-[27px] -translate-y-1/2"
            style={{ scale, width: width, height: height }}
          />
        </div>
      </div>
    </div>
  );
}
