import Image from 'next/image';
import CopyCodeButton from './CopyCodeButton';
import CopyLinkButton from './CopyLinkButton';

export default function RegisterModal({
  refLink = '',
  isOpen = false,
  onClose,
  onCopyCode,
}: {
  refLink: string;
  isOpen: boolean;
  onClose: () => any;
  onCopyCode: () => any;
}) {
  return isOpen ? (
    <div
      className={`top-0 left-0 backdrop-blur-3xl bg-[#11111183] flex py-[27px] h-screen w-screen fixed z-17`}
    >
      <div className="bg-[#0B0B0B] overflow-scroll xl:min-w-[918px] max-h-[90%]  my-auto mx-auto relative rounded-[51px] p-8 xl:p-[50px] xl:max-w-[918px] max-w-[90%]">
        <div className="flex flex-intial mb-[50px] gap-10 items-center ">
          <div
            className="cursor-pointer absolute left-8 top-8"
            onClick={onClose}
          >
            <Image
              alt=""
              className="w-full h-auto"
              src="/images/close.svg"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 text-white text-center text-[32px] font-black">
            🎉 You’re In! Welcome to Dopin
          </div>
        </div>
        <div className="">
          <div className=" text-white px-[35px] my-[30px]">
            <div className="text-[16px]">
              Thanks for joining the <b>Founding Season.</b>
              <br />
              Your spot is secured — now climb the leaderboard by inviting
              friends.
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-y-7 text-white px-[35px] my-[60px]">
            <div className="text-[12px]">
              🔑 Activation Code:
              <br />
              <b>{refLink || '******'}</b>
              <div className=" font-light">(Keep it for get access)</div>
            </div>
            <div className="text-[12px]">
              🔗 Invite Link:
              <br />
              <b className="text-[14px]">https://dopin.io/invite?={refLink}</b>
              <div className=" font-light">
                (Share to earn points and boost your rank.)
              </div>
            </div>
            <div className="text-[12px]">
              🧾 Invite Code
              <br />
              <b className="text-[14px]">1213144546</b>
            </div>
          </div>
          <div className=" text-white px-[35px] my-[30px]">
            <p className="text-[16px]">
              <b>💜 Thank You for Joining Early</b>
              <br />
              <br />
              You’re now officially part of the first wave of Dopiners in San
              Francisco.
              <br />
              Every invite pushes you closer to Early Access and the Founding
              Dopiner badge.
            </p>
          </div>
          <div className="xl:flex grid grid-cols-1 gap-5 xl:flex-wrap xl:gap-4  justify-start  mt-4 ">
            <div className="xl:flex-initial xl:flex block">
              <CopyCodeButton isModal={true} onCopyCode={onCopyCode} />
            </div>
            <div className="xl:flex-initial xl:flex ">
              <CopyLinkButton isModal={true} onCopyCode={onCopyCode} />
            </div>
            <div className="xl:flex xl:flex-1 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="outline_button xl:!w-[257px] xl:mr-0!  w-full"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : undefined;
}
