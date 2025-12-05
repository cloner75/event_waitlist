'use client';
import Image from 'next/image';
import texts from './../public/text.json';
import Video from './components/Video';
import styles from './page.module.css';
import { useEffect, useRef, useState } from 'react';
import MapMobile from './components/MapMobile';
import { WaveRevealSVG } from './components/WaveRevealSVG';
import Modal from './components/Modal';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'privacy' | 'terms' | undefined>(
    undefined
  );

  const [isXL, setIsXL] = useState(false);
  const timeoutRef = useRef<any>(null);
  const resizeTimeoutRef = useRef<any>(null);

  const checkXL = () => window.innerWidth >= 1280;

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
    <div className="xl:overflow-hidden overflow-x-hidden">
      {loading && (
        <div
          className={`top-0 left-0 pointer-events-none h-screen w-screen bg-black fixed z-100 flex items-center justify-center`}
        >
          <Image
            alt={'Dopin'}
            width={274}
            height={97}
            src={'/images/Dopin-white.png'}
          />
        </div>
      )}

      <div
        className={`${
          loading ? 'invisible' : ''
        } select-none xl:flex xl:flex-nowrap xl:h-screen xl:overflow-hidden m-0 p-0 relative bg-[#161616]`}
      >
        <p className="max-xl:hidden fade-up z-2 max-w-[780px] absolute left-[598px] top-[9vh] text-[clamp(24px,2.8vw,64px)] text-white max-xl:max-w-[235px] font-black xl:text-start text-center sm:mx-auto  w-full">
          {texts.hero.title}
        </p>
        <p className="max-xl:hidden fade-up z-2 absolute left-[598px] top-[19vh] text-[clamp(20px,1.35vw,32px)] text-white  font-light">
          {texts.hero.subtitle}
        </p>
        <p className="max-xl:hidden fade-up z-2 absolute left-[598px] top-[21vh] text-[clamp(16px,1.5vh,32px)] leading-[clamp(26px,3vh,38px)] text-white mt-10 max-w-[23vh] font-normal">
          <span className="wave-shimmer">
            {texts.hero.tagline.replace('ME and MY CITY.', ` `).toString()}
            <span className="font-bold">ME and MY CITY.</span>
          </span>
        </p>
        <p
          className={`fade-up max-xl:hidden z-2 ${styles.text_gradient} absolute left-[598px] top-[48vh] text-[clamp(20px,1.45vh,32px)]  leading-[clamp(3vh,4vh,38px)] font-black text-white max-w-[clamp(170px,25vw,187px)] `}
        >
          Earn the Badge only the earliest Dopiners can have.
        </p>
        <p
          className={`fade-up max-xl:hidden z-2 absolute left-[757px] top-[60vh]  font-normal text-[clamp(18px,1.15vw,20px)] leading-[clamp(2vh,3vh,24px)] text-white max-w-[187px]`}
        >
          Only early users can invite. Joining is invite-only.
        </p>
        <Image
          width={398}
          height={427}
          alt="screenshot4"
          src="/images/screenshot4.png"
          className="pointer-events-none z-2 max-xl:hidden w-[35vh] aspect-398/427 absolute bottom-[-3.5vw] left-[599px] object-contain max-w-[398px] "
        />
        <div className="absolute xl:flex hidden  gap-2 z-1 top-[30vh] right-[3vw] max-w-[90vh] w-[45vw] justify-end items-start">
          <div className="relative h-full w-full aspect-697/572">
            <Image
              src="/images/logo-pin.png"
              alt="image"
              width={50}
              height={50}
              className={`z-1 delay-1 absolute object-contain w-1/1 left-[53%] top-[-10%] aspect-square max-w-[60px] `}
            />
            <Image
              src="/images/logo-pin.png"
              alt="image"
              width={50}
              height={50}
              className={`z-1 delay-2  absolute object-contain w-1/1 left-[75%] top-[-27%] aspect-square max-w-[60px] `}
            />
            <Image
              src="/images/logo-pin.png"
              alt="image"
              width={50}
              height={50}
              className={`z-1 delay-3  absolute object-contain w-1/1 left-[30%] top-[10%] aspect-square max-w-[60px] `}
            />
            <Image
              src="/images/logo-pin.png"
              alt="image"
              width={50}
              height={50}
              className={`z-1 delay-4 absolute object-contain w-1/1 right-[-5%] top-[0%]  max-w-[60px] `}
            />

            <Image
              src="/images/3.jpg"
              alt="image"
              width={76}
              height={76}
              className={`z-1 animate-fade-float1 absolute rounded-[clamp(14px,1.5vh,30px)]  w-[clamp(45px,6vh,76px)] object-contain aspect-square left-[85%] top-[-5%]`}
            />
            <Image
              src="/images/6.jpg"
              alt="image"
              width={76}
              height={76}
              className={`z-1 animate-fade-float2 absolute rounded-[clamp(14px,1.5vh,30px)]  w-[clamp(45px,6vh,76px)] object-contain aspect-square left-[70%] top-[-15%] `}
            />
            <Image
              src="/images/1.jpg"
              alt="image"
              width={76}
              height={76}
              className={`z-1 animate-fade-float3 absolute rounded-[clamp(14px,1.5vh,30px)]  w-[clamp(45px,6vh,76px)] object-contain aspect-square left-[55%] top-[-25%] `}
            />
            <Image
              src="/images/5.jpg"
              alt="image"
              width={76}
              height={76}
              className={`z-1 animate-fade-float4 absolute rounded-[clamp(14px,1.5vh,30px)]  w-[clamp(45px,6vh,76px)] object-contain aspect-square left-[42%] top-[-8%] `}
            />
            <Image
              src="/images/2.jpg"
              alt="image"
              width={76}
              height={76}
              className={`z-1 animate-fade-float1 absolute rounded-[clamp(14px,1.5vh,30px)]  w-[clamp(45px,6vh,76px)] object-contain aspect-square left-[25%] top-[20%] `}
            />
          </div>
        </div>
        <div className="absolute xl:flex hidden gap-2 z-1 top-[30vh] right-[3vw] max-w-[90vh] w-[45vw] justify-end items-start">
          <div
            className={`${styles.image_shadow}  relative w-1/6 max-w-[209px] rounded-[27px] aspect-209/452 mt-[8%] overflow-hidden  transition-transform duration-700 ease-out hover:scale-105`}
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
            className={`${styles.image_shadow} relative w-1/4 max-w-[265px] rounded-[27px] aspect-265/572 overflow-hidden transition-transform duration-700 ease-out hover:scale-105`}
          >
            <Image
              src="/images/screenshot2.jpg"
              alt="image"
              width={1000}
              height={1000}
              className="object-cover  w-full h-full fade-up bg-gray-600 rounded-[27px]"
            />
          </div>
          <div
            className={`${styles.image_shadow} relative w-1/6 max-w-[209px] rounded-[27px] aspect-209/452 mt-[8%] overflow-hidden transition-transform duration-700 ease-out hover:scale-105`}
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
        {/* form */}

        <div className="xl:w-[546px] pb-25 w-full relative min-h-full">
          <Video
            src="/video.mp4"
            className="pointer-events-none absolute top-0 left-0 object-cover w-full h-full"
          />
          <div className="absolute pointer-events-none bg-[#000000] opacity-[0.6] top-0 left-0  h-full w-full"></div>
          <div className="relative z-2">
            <div className="pt-[71px] fade-up-custom1 xl:pt-[5%] flex justify-center">
              <div className={styles.badge}>{texts.waitlist.badge}</div>
            </div>
            <div className="mx-auto fade-up-custom2 justify-center h-[97px] w-[30vh] relative ">
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
            <p className="fade-up-custom3 items-center text-center gap-2.5 flex justify-center text-[32px] xl:text-[3.5vh] text-white font-black">
              <Image
                alt={'Fire'}
                width={40}
                height={40}
                src={'/images/fire_1f525.png'}
                className="object-contain w-10 aspect-square xl:w-[3.5vh]"
              />
              {texts.waitlist.foundingSeason}
            </p>
            <p className="fade-up-custom4 text-center mx-auto max-w-[352px] leading-[19px] mt-[4vh] text-[16px] xl:text-[2vh] text-white font-normal">
              Only 350 spots in San Francisco get Early
              <br /> Access before launch.
              <br /> <span className="font-bold">The top 100</span> also earn
              the permanent Founding Dopiner — SF badge.
            </p>
            <p className="xl:flex items-center hidden text-center mt-5 gap-2.5 justify-center text-[2.3vh] text-white font-normal">
              <Image
                alt={'Star'}
                width={20}
                height={20}
                src={'/images/star-struck_1f929.png'}
                className="object-contain"
              />
              {texts.waitlist.areYouReady}
            </p>
            <form autoComplete="on" className="xl:mt-5 mt-3 max-xl:px-5">
              <input
                autoComplete="email"
                type="email"
                name="email"
                placeholder={texts.forms.emailAddress}
                className="mt-3 outline-none!  max-xl:w-full text-white px-7 placeholder:text-[18px] text-[18px] placeholder:text-white placeholder:opacity-[0.5] flex items-center max-w-[369px] w-full xl:max-w-[437px] h-[57px] mx-auto xl:h-[clamp(4vh,6vh,57px)] border border-white backdrop-blur-[7.1px] rounded-2xl"
              />
              <input
                type="text"
                placeholder={texts.forms.referralCode}
                className="mt-3 outline-none!  max-xl:max-w-[369px] text-white px-7 placeholder:text-[18px] text-[18px] placeholder:text-white placeholder:opacity-[0.5] flex items-center max-w-[369px] w-full xl:max-w-[437px] h-[57px] mx-auto xl:h-[clamp(4vh,6vh,57px)] border border-white backdrop-blur-[7.1px] rounded-2xl"
              />
              <button
                className={`${styles.linear_button} max-w-[369px] w-full max-xl:mb-2 hover:opacity-70 hover:cursor-pointer text-[clamp(14px,2vh,18px)] font-normal  text-white w-[437px] mt-7 items-center mx-auto flex justify-center text-center h-[57px]  xl:h-[clamp(4vh,6vh,57px)]`}
              >
                {texts.buttons.getMySpot}
              </button>
            </form>
            <p className="xl:my-[3vh] my-8 font-light leading-[17px] text-center text-[14px] text-white max-w-[310px] mx-auto">
              {texts.legal.agreeToTerms}{' '}
              <span
                onClick={() => {
                  setModal('terms');
                }}
                className="underline font-semibold cursor-pointer"
              >
                Terms
              </span>{' '}
              and{' '}
              <span
                onClick={() => {
                  setModal('privacy');
                }}
                className="underline font-semibold cursor-pointer"
              >
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
        {/* form */}
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
          <Image
            width={394}
            height={427}
            alt="screenshot4"
            src="/images/screenshot4.png"
            className="pointer-events-none z-2 w-[394px] aspect-394/427 absolute top-[70px] right-[-130px] object-contain "
          />

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
        <div className="flex-1 relative xl:h-auto h-[667px]">
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

      <span
        className={`flex max-lg:right-5 items-center pointer-events-none px-[18px] gap-3 text-white fade-up font-semibold text-[16px] backdrop-blur-[5.05px] bg-[rgba(0,255,76,0.23)] rounded-[43px] h-[45px] w-[187px] bottom-9 right-[1vw] fixed z-10 `}
      >
        <div className="bg-[#00FF4C] rounded-full h-[17px] w-[17px] shadow-[0px_0px_11.8px_#00FF4C]"></div>
        44 Online now
      </span>
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
          <div className="flex-1 font-light text-[14px] text-white">
            All Right Resaved for <span className="font-bold">Dopin LLC</span> •
            Copyright 2025
          </div>
        </div>
        <div className="flex-none flex gap-10 items-center">
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
            className="flex-none cursor-pointer flex items-center font-light underline text-[14px] text-white"
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
  );
}
