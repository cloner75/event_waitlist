import Image from 'next/image';
import { useState } from 'react';

export default function CopyLinkButton({
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
          setText('Copy Link');
        }, 2500);
      }}
      className={
        isModal
          ? 'linear_button xl:flex-none flex gap-2 xl:w-[210px]! w-full'
          : 'linear_button flex-1 flex gap-2 items-center justify-center'
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
