'use client';
import Image from 'next/image';
import texts from './../public/text.json';
import Video from './components/Video';
import styles from './page.module.css';
import { useEffect, useRef, useState } from 'react';
import MapMobile from './components/MapMobile';
import { WaveRevealSVG } from './components/WaveRevealSVG';
import Modal from './components/Modal';
import RightFadeInImage from './components/RightFadeInImage';
import FormState from './components/FormState';
import BottomFadeInImage from './components/BottomFadeInImage';
import { motion } from 'motion/react';
import RegisterModal from './components/RegisterModal';
import RandomOnline from './components/RandomOnline';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'privacy' | 'terms' | undefined>(
    undefined
  );

  const [isXL, setIsXL] = useState(false);
  const timeoutRef = useRef<any>(null);
  const resizeTimeoutRef = useRef<any>(null);
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>('');

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };
  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
  };
  const checkXL = () => window.innerWidth >= 1280;
  const getToken = (refCode: string, showModal: boolean) => {
    setReferralCode(refCode);
    if (showModal) {
      setTimeout(() => {
        handleOpenRegisterModal();
      }, 500);
    }
  };

  async function handleCopyCode() {
    let text = `Hey! I just joined the Dopin waitlist — it's all about local vibes, fun events, and real connections.
Join with my invite so we can unlock it together 💫👇
https://waitlist.dopin.io/invite?=${referralCode}
Code: ${referralCode}`;
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  useEffect(() => {
    setIsXL(checkXL());

    timeoutRef.current = setTimeout(() => setLoading(false), 1500);

    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        const nowXL = checkXL();
        if (nowXL !== isXL) {
          setIsXL(nowXL);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          setLoading(true);
          timeoutRef.current = setTimeout(() => setLoading(false), 1500);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [isXL]);

  return (
    <>
      <div className="xl:overflow-hidden overflow-x-hidden">
        {loading && (
          <div
            className={`top-0 left-0 pointer-events-none h-screen w-screen bg-[#161616] fixed z-100 flex items-center justify-center`}
          >
            <div>
              <Image
                alt={'Dopin'}
                width={274}
                height={97}
                src={'/images/Dopin-white.png'}
                className="w-[220px] h-auto"
              />
              <div className="w-[150px] bg-[rgba(255,255,255,0.1)] mt-5 h-1 overflow-hidden mx-auto rounded-full">
                <div className="loading-bar w-[50%] h-1 bg-[linear-gradient(90deg,#EC30E4,#581DFF)] rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${
            loading ? 'invisible' : ''
          } select-none xl:flex xl:flex-nowrap xl:h-screen xl:overflow-hidden m-0 p-0 relative bg-[#161616]`}
        >
          <div className="xl:h-screen z-15 h-full xl:w-[34cqw] xl:max-w-[546px] pb-25 w-full  relative">
            <Video
              src="/video.mp4"
              className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute pointer-events-none bg-[rgba(0,0,0,0.6)] opacity-[0.8] top-0 left-0 w-full h-full"></div>

            <div className="relative  xl:overflow-y-scroll xl:h-screen">
              <div className="pt-[71px] fade-up-custom1 xl:pt-[15%] flex justify-center">
                <div className={styles.badge}>{texts.waitlist.badge}</div>
              </div>
              <div className="mx-auto fade-up-custom2 justify-center mt-2.5 h-[97px] w-[274px] aspect-auto xl:w-[15cqw] relative ">
                <span className="absolute top-0 text-white font-medium right-0 text-[11px]">
                  TM
                </span>
                <Image
                  alt={'Dopin'}
                  width={274}
                  height={97}
                  src={'/images/Dopin-white.png'}
                  className="aspect-274/97"
                />
              </div>
              <p className="fade-up-custom3 items-center text-center gap-2.5 xl:h-12 xl:mt-1 flex justify-center text-[32px] xl:text-[40px] text-white font-black">
                <Image
                  alt={'Fire'}
                  width={40}
                  height={40}
                  src={'/images/fire_1f525.png'}
                  className="object-contain w-10 aspect-square xl:w-10"
                />
                {texts.waitlist.foundingSeason}
              </p>

              <FormState
                openPrivayModal={() => {
                  setModal('privacy');
                }}
                openTermsModal={() => {
                  setModal('terms');
                }}
                getToken={getToken}
                handleCopyCode={handleCopyCode}
              />
            </div>
          </div>
          {/* end-form */}
          <div className="xl:hidden h-[420px] relative z-3">
            <div className="absolute z-1 top-[70px] left-[-100px] h-[362px] w-[150vw] bg-[#131313] rotate-[-5.36deg]"></div>

            <p
              className={`fade-up z-2 ${styles.text_gradient} absolute left-[29px] top-[70px] text-[29px]  leading-[35px] font-black text-white max-w-[clamp(170px,25vw,157px)] `}
            >
              Earn the Badge only the earliest Dopiners can have.
            </p>
            <p
              className={`fade-up z-2 absolute left-[29px] top-[300px]  font-normal text-[16px] leading-[19px] text-white max-w-[157]`}
            >
              Only early users can invite. Joining is invite-only.
            </p>
            <RightFadeInImage />

            <div className="absolute w-[178px] h-[55px] left-[29px] top-[380px] z-4">
              <div className="relative w-full h-full gap-3 justify-center text-white bg-black rounded-2xl flex items-center shadow-[0px_4px_62.4px_rgba(0,0,0,0.39)]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5639 9.6293C14.3959 9.6293 12.5879 8.3013 10.6839 8.3493C8.17193 8.3813 5.86793 9.8053 4.57193 12.0613C1.96393 16.5893 3.89993 23.2773 6.44393 26.9573C7.69193 28.7493 9.16393 30.7653 11.1159 30.7013C12.9879 30.6213 13.6919 29.4853 15.9639 29.4853C18.2199 29.4853 18.8599 30.7013 20.8439 30.6533C22.8599 30.6213 24.1399 28.8293 25.3719 27.0213C26.7959 24.9413 27.3879 22.9253 27.4199 22.8133C27.3719 22.7973 23.4999 21.3093 23.4519 16.8293C23.4199 13.0853 26.5079 11.2933 26.6519 11.2133C24.8919 8.6373 22.1879 8.3493 21.2439 8.2853C18.7799 8.0933 16.7159 9.6293 15.5639 9.6293ZM19.7239 5.8533C20.7639 4.6053 21.4519 2.8613 21.2599 1.1333C19.7719 1.1973 17.9799 2.1253 16.9079 3.3733C15.9479 4.4773 15.1159 6.2533 15.3399 7.9493C16.9879 8.0773 18.6839 7.1013 19.7239 5.8533Z"
                    fill="white"
                  />
                </svg>
                <div className="w-[98px] leading-[18px]">
                  Download on <b>AppStore</b>
                </div>
                <div className="absolute shadow-[0px_19px_41px_rgba(236,48,228,0.57)] w-[116px] justify-center flex rounded-full bg-[#EC30E4] items-center text-[12px] font-normal text-white h-[27px] top-[50px] left-[28px]">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative xl:h-screen h-[667px] xl:overflow-y-visible">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: 'easeOut',
                delay: 2,
                repeat: 0,
              }}
              className="xl:flex hidden z-2 absolute left-[2.5cqw] top-[4cqw] text-[3.5cqw] text-white  font-black xl:text-start text-center sm:mx-auto "
            >
              {texts.hero.title}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: 'easeOut',
                delay: 2.2,
                repeat: 0,
              }}
              className="xl:flex hidden z-2 absolute left-[2.5cqw] top-[9cqw] text-[1.7cqw] text-white  font-light"
            >
              {texts.hero.subtitle}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: 'easeOut',
                delay: 2.4,
                repeat: 0,
              }}
              className="xl:flex hidden z-2 absolute left-[2.5cqw] top-[20vh] text-[1.6cqw] leading-[2cqw] text-white mt-10 max-w-[20cqw] font-normal"
            >
              <span className="wave-shimmer">
                This isn't another
                <br /> random app—this is
                <br /> about &nbsp;
                <span className="font-bold">ME and MY CITY.</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: 'easeOut',
                delay: 2.6,
                repeat: 0,
              }}
              className="absolute z-2 xl:flex hidden left-[2.5cqw] top-[48vh] text-[1.5cqw]"
            >
              <div className="relative w-[500px]">
                <p
                  className={`xl:flex hidden z-2 ${styles.text_gradient} absolute left-0 top-0 text-[1.7cqw]  leading-[2cqw] font-black text-white max-w-[9cqw] `}
                >
                  Earn the Badge only the earliest Dopiners can have.
                </p>
                <p
                  className={`xl:flex hidden z-2 absolute left-[8cqw] top-[7cqw]  font-normal text-[1.15cqw] leading-[clamp(2vh,3vh,24px)] text-white max-w-[187px]`}
                >
                  Only early users can invite. Joining is invite-only.
                </p>
              </div>
            </motion.div>

            <BottomFadeInImage />

            <div className="absolute xl:flex hidden  gap-2 z-1 top-[33vh] right-[3vw] max-w-[90vh] w-[50cqw] justify-end items-start">
              <div className="relative h-full w-full aspect-697/572">
                {/* pins */}
                <Image
                  src="/images/logo-pin.png"
                  alt="image"
                  width={150}
                  height={150}
                  className={`z-1 delay-1 absolute object-contain left-[8%] top-[5%] aspect-square w-[5cqw]`}
                />
                <Image
                  src="/images/logo-pin.png"
                  alt="image"
                  width={150}
                  height={150}
                  className={`z-1 delay-1 absolute object-contain left-[40%] top-[-12%] aspect-square w-[5cqw]`}
                />
                <Image
                  src="/images/logo-pin.png"
                  alt="image"
                  width={150}
                  height={150}
                  className={`z-1 delay-1 absolute object-contain right-[-5%] top-[-2%] aspect-square w-[5cqw]`}
                />
                <Image
                  src="/images/logo-pin.png"
                  alt="image"
                  width={150}
                  height={150}
                  className={`z-1 delay-1 absolute object-contain left-[75%] top-[-30%] aspect-square w-[5cqw]`}
                />

                {/* images */}
                <Image
                  src="/images/3.jpg"
                  alt="image"
                  width={100}
                  height={100}
                  className={`z-1 animate-fade-float1 absolute rounded-[1.2cqw] w-[4cqw] object-contain aspect-square left-[80%] top-[-5%]`}
                />
                <Image
                  src="/images/6.jpg"
                  alt="image"
                  width={100}
                  height={100}
                  className={`z-1 animate-fade-float2 absolute rounded-[1.2cqw]  w-[4cqw] object-contain aspect-square left-[62%] top-[-15%] `}
                />
                <Image
                  src="/images/1.jpg"
                  alt="image"
                  width={100}
                  height={100}
                  className={`z-1 animate-fade-float3 absolute rounded-[1.2cqw]  w-[4cqw] object-contain aspect-square left-[45%] top-[-25%] `}
                />
                <Image
                  src="/images/5.jpg"
                  alt="image"
                  width={100}
                  height={100}
                  className={`z-1 animate-fade-float4 absolute rounded-[1.2cqw]  w-[4cqw] object-contain aspect-square left-[27%] top-[-10%] `}
                />
                <Image
                  src="/images/2.jpg"
                  alt="image"
                  width={100}
                  height={100}
                  className={`z-1 animate-fade-float1 absolute rounded-[1.2cqw]  w-[4cqw] object-contain aspect-square left-[5%] top-[23%] `}
                />
              </div>
            </div>
            <div className="absolute xl:flex hidden gap-[0.5cqw] z-1 top-[33vh] right-[6cqw] max-w-[90vh] w-[45vw] justify-end items-start">
              <div
                className={`${styles.image_shadow}  relative w-[19vh] rounded-[27px] aspect-209/452 mt-[8%] overflow-hidden  transition-transform duration-700 ease-out hover:scale-105`}
              >
                <Image
                  src="/images/screenshot1.jpg"
                  alt="image"
                  width={1000}
                  height={1000}
                  className="object-cover  w-full h-full fade-up bg-gray-400 rounded-[27px]"
                />
              </div>
              <div
                className={`${styles.image_shadow} relative w-[25vh] rounded-[27px] aspect-265/572 overflow-hidden transition-transform duration-700 ease-out hover:scale-105`}
              >
                <Image
                  src="/images/screenshot2.jpg"
                  alt="image"
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full fade-up bg-gray-600 rounded-[27px]"
                />
              </div>
              <div
                className={`${styles.image_shadow} relative w-[19vh] rounded-[27px] aspect-209/452 mt-[8%] overflow-hidden transition-transform duration-700 ease-out hover:scale-105`}
              >
                <Image
                  src="/images/screenshot3.png"
                  alt="image"
                  width={1000}
                  height={1000}
                  className="object-cover  w-full h-full fade-up bg-gray-400 rounded-[27px]"
                />
              </div>
            </div>
            <Image
              width={700}
              height={1100}
              alt="Map"
              src="/images/map.jpg"
              className="pointer-events-none absolute top-0 left-0 object-cover w-full h-full"
            />
            <MapMobile />

            <div className="absolute pointer-events-none bg-[linear-gradient(119.35deg,rgba(23,23,23,0.51)_20.7%,#161616_86.79%)] top-0 left-0 h-full w-full"></div>
            <div className="relative">
              <div className="xl:flex bg-[#111111] h-[37px] hidden">
                <div
                  className={`h-[37px] gap-1 ${styles.linear_time} flex items-center justify-end pr-5`}
                >
                  <span className="text-[12px] text-white font-black">56</span>{' '}
                  <span className="text-[10px] text-white opacity-50 font-bold">
                    {texts.countdown.daysLeft}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:hidden pb-15 relative">
            <p className="mt-[220px] leading-[38px] wave-shimmer text-white text-[32px] font-normal px-[27px]">
              {texts.hero.description}
            </p>
          </div>
          <WaveRevealSVG />
          <div className="xl:hidden opacity-50 mb-[100px] grid grid-cols-1 gap-5">
            <div>
              <div className="flex justify-center items-center">
                <svg
                  width="24"
                  height="24"
                  className="flex-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10C16 9.20435 15.6839 8.44129 15.1213 7.87868C14.5587 7.31607 13.7957 7 13 7H11C10.2044 7 9.44129 7.31607 8.87868 7.87868C8.31607 8.44129 8 9.20435 8 10V14C8 14.7956 8.31607 15.5587 8.87868 16.1213C9.44129 16.6839 10.2044 17 11 17H13C13.7957 17 14.5587 16.6839 15.1213 16.1213C15.6839 15.5587 16 14.7956 16 14C16 13.7348 15.8946 13.4804 15.7071 13.2929C15.5196 13.1054 15.2652 13 15 13C14.7348 13 14.4804 13.1054 14.2929 13.2929C14.1054 13.4804 14 13.7348 14 14C14 14.2652 13.8946 14.5196 13.7071 14.7071C13.5196 14.8946 13.2652 15 13 15H11C10.7348 15 10.4804 14.8946 10.2929 14.7071C10.1054 14.5196 10 14.2652 10 14V10C10 9.73478 10.1054 9.48043 10.2929 9.29289C10.4804 9.10536 10.7348 9 11 9ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                    fill="white"
                  />
                </svg>
                <div className="flex-none font-light text-[14px] text-white">
                  All Right Resaved for{' '}
                  <span className="font-bold">Dopin LLC</span> • Copyright 2025
                </div>
              </div>
            </div>
            <div>
              <div className="flex-none flex gap-10 justify-center items-center">
                <div
                  onClick={() => {
                    setModal('terms');
                  }}
                  className="flex-none cursor-pointer flex items-center font-light underline text-[14px] text-white"
                >
                  Terms of use
                </div>
                <div
                  onClick={() => {
                    setModal('privacy');
                  }}
                  className="flex-none flex cursor-pointer items-center font-light underline text-[14px] text-white"
                >
                  Privacy & Policy
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`xl:flex hidden xl:bottom-10 opacity-50 gap-10 xl:right-[17vw] w-screen xl:fixed xl:z-10  items-center justify-end`}
        >
          <div className="flex flex-none items-center">
            <svg
              width="24"
              height="24"
              className="flex-none"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10C16 9.20435 15.6839 8.44129 15.1213 7.87868C14.5587 7.31607 13.7957 7 13 7H11C10.2044 7 9.44129 7.31607 8.87868 7.87868C8.31607 8.44129 8 9.20435 8 10V14C8 14.7956 8.31607 15.5587 8.87868 16.1213C9.44129 16.6839 10.2044 17 11 17H13C13.7957 17 14.5587 16.6839 15.1213 16.1213C15.6839 15.5587 16 14.7956 16 14C16 13.7348 15.8946 13.4804 15.7071 13.2929C15.5196 13.1054 15.2652 13 15 13C14.7348 13 14.4804 13.1054 14.2929 13.2929C14.1054 13.4804 14 13.7348 14 14C14 14.2652 13.8946 14.5196 13.7071 14.7071C13.5196 14.8946 13.2652 15 13 15H11C10.7348 15 10.4804 14.8946 10.2929 14.7071C10.1054 14.5196 10 14.2652 10 14V10C10 9.73478 10.1054 9.48043 10.2929 9.29289C10.4804 9.10536 10.7348 9 11 9ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                fill="white"
              />
            </svg>
            <div className="flex-1 font-light text-[0.69cqw] text-white">
              All Right Resaved for <span className="font-bold">Dopin LLC</span>{' '}
              • Copyright 2025
            </div>
          </div>
          <div className="flex-none flex gap-10 items-center">
            <div
              onClick={() => {
                setModal('terms');
              }}
              className="flex-none cursor-pointer flex items-center font-light underline text-[0.69cqw] text-white"
            >
              Terms of use
            </div>
            <div
              onClick={() => {
                setModal('privacy');
              }}
              className="flex-none cursor-pointer flex items-center font-light underline text-[0.69cqw] text-white"
            >
              Privacy & Policy
            </div>
          </div>
        </div>

        {modal != undefined && (
          <Modal
            isOpen={modal != undefined}
            name={modal}
            onClose={() => {
              setModal(undefined);
            }}
          />
        )}
      </div>
      <RegisterModal
        isOpen={openRegisterModal}
        refLink={referralCode}
        onClose={handleCloseRegisterModal}
        onCopyCode={handleCopyCode}
      />
      <span
        className={`flex max-lg:right-5 items-center pointer-events-none px-[18px] gap-3 text-white fade-up font-semibold text-[16px] backdrop-blur-[5.05px] bg-[rgba(0,255,76,0.23)] rounded-[43px] h-[45px] w-[187px] bottom-9 right-[1vw] fixed z-16 `}
      >
        <div className="bg-[#00FF4C] rounded-full h-[17px] w-[17px] shadow-[0px_0px_11.8px_#00FF4C]"></div>
        <RandomOnline /> Online now
      </span>
    </>
  );
}
