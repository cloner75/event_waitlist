'use client';
import Image from 'next/image';
import texts from './../../public/text.json';
import styles from './../page.module.css';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import OTPInput from './OTPInput';
import RegisterModal from './RegisterModal';
import httpClient from '@/Utils/HttpClient';
import { motion } from 'motion/react';
import CopyCodeButton from './CopyCodeButton';
import CopyLinkButton from './CopyLinkButton';
import SimpleCopyLinkButton from './SimpleCopyLinkButton';

export default function FormState({
  openPrivayModal,
  openTermsModal,
  getToken,
  handleCopyCode,
}: {
  openPrivayModal: () => void;
  openTermsModal: () => void;
  getToken: (v: string, showModal: boolean) => void;
  handleCopyCode: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>('');
  const [step, setStep] = useState<'email' | 'otp' | 'complete'>('email');
  const [email, setEmail] = useState<string>('');
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const countdownRef = useRef<CountdownRef>(null);

  const handleResetCountDown = () => {
    countdownRef.current?.reset();
  };
  const handleOTPChange = (newOtp: string[]) => {
    setOtp(newOtp);

    if (newOtp.every((d) => d !== '')) {
      console.log('Completed:', newOtp.join(''));
    }
  };
  const handleResendCode = () => {
    setErrorText(undefined);
    setOtp(['', '', '', '', '', '']);
    handleSendEmail();
  };
  async function handleSendOtp() {
    if (otp.every((i) => i == '')) {
      setErrorText('Enter valid OTP code');

      return;
    }
    setWaiting(true);
    setErrorText(undefined);
    try {
      const res = await httpClient.verifyOtp({
        code: otp.join(''),
        email,
      });
      const accesstoken = res.data.data.access_token;
      localStorage.setItem('token', accesstoken);
      localStorage.setItem('email', email);
      httpClient.setToken(accesstoken);
      const inviteCodeRes = await httpClient.getInviteCode();
      setReferralCode(inviteCodeRes.data.data.invite_code);
      setStep('complete');
      setOtp(['', '', '', '', '', '']);

      getToken(inviteCodeRes.data.data.invite_code, true);
    } catch (error: any) {
      setErrorText(error.response.data.message ?? 'Unknow error');
    } finally {
      setWaiting(false);
    }
  }
  async function handleSendEmail() {
    if (!isValidEmail(email)) {
      setErrorText('Please enter valid email');
      return;
    }
    setWaiting(true);
    try {
      let res = await httpClient.sendOtp({
        email,
      });
      handleResetCountDown();
      setErrorText(undefined);
      setStep('otp');
    } catch (error: any) {
    } finally {
      setWaiting(false);
    }
  }
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  async function handleLogout() {
    setWaiting(true);
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      httpClient.removeToken();
      setEmail('');
      setReferralCode('');
      setOtp(['', '', '', '', '', '']);
      setStep('email');
    } catch (error) {
    } finally {
      setWaiting(false);
    }
  }
  async function initForm() {
    let accesstoken = localStorage.getItem('token');
    let _email = localStorage.getItem('email');

    try {
      if (
        accesstoken &&
        _email &&
        accesstoken.length > 0 &&
        _email.length > 0
      ) {
        localStorage.setItem('token', accesstoken);
        httpClient.setToken(accesstoken);
        const inviteCodeRes = await httpClient.getInviteCode();
        setReferralCode(inviteCodeRes.data.data.invite_code);
        getToken(inviteCodeRes.data.data.invite_code, false);
        setEmail(_email);
        setStep('complete');
      }
    } catch (error) {
      console.log(error);

      httpClient.removeToken();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setStep('email');
      setReferralCode('');
      setEmail('');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    initForm();
  }, []);
  useEffect(() => {
    setErrorText(undefined);
  }, [otp]);
  if (loading) return undefined;
  if (step == 'email')
    return (
      <div className="xl:pb-10">
        <p className="fade-up text-center mx-auto max-w-[352px] leading-6 mt-[4vh] text-[16px] text-white font-normal">
          Only 350 spots in San Francisco get Early
          <br /> Access before launch.
          <br /> <span className="font-bold">The top 100</span> also earn the
          permanent Founding Dopiner — SF badge.
        </p>
        <p className="xl:flex items-center fade-up hidden text-center mt-[30px] gap-2.5 justify-center text-[18px] text-white font-normal">
          <Image
            alt={'Star'}
            width={20}
            height={20}
            src={'/images/star-struck_1f929.png'}
            className="object-contain "
          />
          {texts.waitlist.areYouReady}
        </p>
        <form
          autoComplete="on"
          onSubmit={handleSendEmail}
          className="xl:mt-4 mt-7 px-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
              delay: 2.1,
              repeat: 0,
            }}
          >
            <input
              autoComplete="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={texts.forms.emailAddress}
              className="text-input"
            />
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
          >
            <input
              type="text"
              placeholder={texts.forms.referralCode}
              className="text-input"
            />
          </motion.div>
          <div className="mt-4 flex justify-between max-w-[437px] w-full items-center mx-auto">
            {errorText != undefined && (
              <div className="bg-[#FF395D] text-white font-normal text-[14px] rounded-full px-3 h-[31px] flex items-center">
                {errorText}
              </div>
            )}
          </div>
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
          >
            <button
              type="button"
              onClick={handleSendEmail}
              className={`linear_button mt-9 ${waiting && 'waiting'}`}
            >
              {texts.buttons.getMySpot}
            </button>
            <p className="xl:my-[3vh] my-8 font-light leading-[17px] text-center text-[14px] text-white max-w-[310px] mx-auto">
              {texts.legal.agreeToTerms}{' '}
              <span
                onClick={openTermsModal}
                className="underline font-semibold cursor-pointer"
              >
                Terms
              </span>{' '}
              and{' '}
              <span
                onClick={openPrivayModal}
                className="underline font-semibold cursor-pointer"
              >
                Privacy Policy
              </span>
              .
            </p>
          </motion.div>
        </form>
      </div>
    );
  if (step == 'otp')
    return (
      <div className="xl:pb-10">
        <p className="text-center mx-auto max-w-[352px] leading-6 mt-[4vh] text-[20px] text-white font-normal">
          Only 350 spots in San Francisco get <br /> Early Access before launch.{' '}
          <br />
          Race up the leaderboard by inviting <br /> friends—your rank updates
          in real <br /> time. <br />
          The top 100 also earn the permanent <br /> Founding Dopiner — SF
          badge.
        </p>
        <p className="text-center mx-auto max-w-[424px] leading-6 mt-[3vh] text-[18px] text-white font-normal">
          We've sent a text to <b>{email}</b>. Enter the code to securely
          confirm your identity.
        </p>

        <form
          autoComplete="on"
          onSubmit={handleSendOtp}
          className="xl:mt-4 mt-7 px-7"
        >
          <div className="flex gap-2 flex-nowrap w-full mx-auto max-w-[437px] overflow-hidden">
            <OTPInput
              haveError={errorText != undefined}
              value={otp}
              length={6}
              onChange={handleOTPChange}
            />
          </div>
          <div className="mt-4 flex justify-between max-w-[437px] w-full items-center mx-auto">
            {errorText != undefined ? (
              <div className="bg-[#FF395D] text-white font-normal text-[14px] rounded-full px-3 h-[31px] flex items-center">
                {errorText}
              </div>
            ) : (
              <div></div>
            )}
            <Countdown
              ref={countdownRef}
              handleResendCode={handleResendCode}
              initialSeconds={120}
            />
          </div>
          <button
            type="button"
            onClick={handleSendOtp}
            className={`linear_button mt-4 ${waiting && 'waiting'}`}
          >
            {texts.buttons.submit}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep('email');
            }}
            className="outline_button mt-4"
          >
            {texts.buttons.changeEmail}
          </button>
        </form>
      </div>
    );
  if (step == 'complete')
    return (
      <div className="xl:pb-10">
        <p className="text-center mx-auto max-w-[352px] leading-6 mt-[4vh] text-[20px] text-white font-normal">
          Only 350 spots in San Francisco get <br /> Early Access before launch.{' '}
          <br />
          Race up the leaderboard by inviting <br /> friends—your rank updates
          in real <br /> time. <br />
          The top 100 also earn the permanent <br /> Founding Dopiner — SF
          badge.
        </p>
        <p className="text-center mx-auto max-w-[424px] leading-[19px] mt-[3vh] text-[18px] text-white font-normal">
          You are already registered🎉
        </p>

        <form
          autoComplete="on"
          onSubmit={handleSendOtp}
          className="xl:mt-4 mt-7 px-7"
        >
          <p className="text-center w-full leading-[19px] mt-[3vh] text-[18px] text-white font-normal">
            Your Referral link:
          </p>
          <div className="flex gap-2 flex-nowrap w-full mx-auto  overflow-hidden">
            <input
              value={referralCode}
              readOnly
              type="text"
              className="text-input"
            />
          </div>
          <div className="flex gap-4 mt-4 max-w-[437px] mx-auto">
            <CopyCodeButton isModal={false} onCopyCode={handleCopyCode} />
            <CopyLinkButton isModal={false} onCopyCode={handleCopyCode} />
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="outline_button mt-4"
          >
            {texts.buttons.logout}
          </button>
          <div className="w-full max-w-[437px] text-white mx-auto mt-[3vh] p-[25px] backdrop-blur-[4.9px] rounded-[19px] bg-[rgba(22,22,22,0.75)] border border-[#252525]">
            <div className="flex gap-3 ">
              <div className="flex-1">
                <div className="text-[12px] font-semibold">
                  🔑 Activation Code:
                  <br />
                  <div className="font-black">{referralCode}</div>
                  <div className=" font-light">(Keep it for get access)</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-semibold">
                  🔗 Invite Link:
                  <br />
                  <div className="font-black">
                    https://dopin.io/invite?={referralCode}
                  </div>
                  <div className=" font-light">
                    (Share to invite your friends)
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[12px] font-semibold mt-3">
              🧾 Invite Code
              <br />
              <div className="font-black">{referralCode}</div>
            </div>

            <div className="text-[12px] font-semibold mt-4">
              <SimpleCopyLinkButton onCopyCode={handleCopyCode} />
            </div>
          </div>
        </form>
      </div>
    );
}

interface CountdownProps {
  initialSeconds: number;
  handleResendCode: () => void;
}

export interface CountdownRef {
  reset: () => void;
}

const Countdown = forwardRef<CountdownRef, CountdownProps>(
  ({ initialSeconds, handleResendCode }, ref) => {
    const maxSeconds = 300;
    const [secondsLeft, setSecondsLeft] = useState(
      Math.min(initialSeconds, maxSeconds)
    );
    const [isActive, setIsActive] = useState(true);

    useImperativeHandle(ref, () => ({
      reset() {
        setSecondsLeft(Math.min(initialSeconds, maxSeconds));
        setIsActive(true);
      },
    }));

    useEffect(() => {
      if (!isActive || secondsLeft <= 0) return;

      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [isActive, secondsLeft]);

    const formatTime = (sec: number) => {
      const m = Math.floor(sec / 60)
        .toString()
        .padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };

    return secondsLeft == 0 ? (
      <button
        type="button"
        onClick={handleResendCode}
        className="bg-[rgba(255,255,255,0.11)] cursor-pointer text-white backdrop-blur-[4.6px] rounded-full px-3 h-[31px] flex items-center"
      >
        Resend Code
      </button>
    ) : (
      <div className="bg-[rgba(255,255,255,0.11)] text-[#9D9D9D] backdrop-blur-[4.6px] rounded-full px-3 h-[31px] flex items-center">
        Resend in {formatTime(secondsLeft)}
      </div>
    );
  }
);
