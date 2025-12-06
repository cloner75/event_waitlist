import { useState } from 'react';

export default function SimpleCopyLinkButton({
  onCopyCode,
}: {
  onCopyCode: () => void;
}) {
  const [text, setText] = useState('Copy Code');
  return (
    <button
      type="button"
      onClick={() => {
        setText('Copied!');
        onCopyCode();
        setTimeout(() => {
          setText('Copy');
        }, 2500);
      }}
      className="text-[14px] cursor-pointer text-white bg-[linear-gradient(0deg,#581DFF,#581DFF)] w-full max-w-[437px]  mx-auto rounded-[10px] h-[42px]"
    >
      {text}
    </button>
  );
}
