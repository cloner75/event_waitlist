import Image from 'next/image';
import { useState } from 'react';

export default function CopyCodeButton({
  onCopyCode,
  isModal = false,
}: {
  onCopyCode: () => void;
  isModal: boolean;
}) {
  const [text, setText] = useState('Copy Code');
  return (
    <button
      type="button"
      onClick={() => {
        setText('Copied!');
        onCopyCode();
        setTimeout(() => {
          setText('Copy Code');
        }, 2500);
      }}
      className={
        isModal
          ? 'secondary_button xl:flex-none flex gap-2  w-full xl:w-[210px]! '
          : 'secondary_button flex-1 flex gap-2 items-center justify-center'
      }
    >
      <Image
        src="/icons/mdi_numbers.png"
        alt="icon"
        width={24}
        height={24}
        className="aspect-auto"
      />
      {text}
    </button>
  );
}
