import React, { useRef } from 'react';

interface OTPInputProps {
  value: string[];
  length?: number;
  haveError: boolean;
  onChange: (otp: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  haveError = false,
  value,
  length = 6,
  onChange,
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (val: string, index: number) => {
    const newOtp = [...value];

    if (val === '') {
      newOtp[index] = '';
      onChange(newOtp);
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(val)) return;

    newOtp[index] = val;
    onChange(newOtp);

    if (val && index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !value[index] && index > 0)
      inputRefs.current[index - 1]?.focus();

    if (e.key === 'ArrowLeft' && index > 0)
      inputRefs.current[index - 1]?.focus();

    if (e.key === 'ArrowRight' && index < length - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault(); // ❗ مهم

    const pasted = e.clipboardData.getData('text').trim();

    if (!/^[a-zA-Z0-9]+$/.test(pasted)) return;

    const arr = pasted.slice(0, length).split('');
    const newOtp = [...value];

    arr.forEach((char, i) => {
      newOtp[i] = char;
    });

    onChange(newOtp);

    const nextIndex = arr.length >= length ? length - 1 : arr.length;
    inputRefs.current[nextIndex]?.focus();
  };

  return value.map((digit, index) => (
    <input
      key={index}
      ref={(el: HTMLInputElement | null) => {
        inputRefs.current[index] = el;
      }}
      value={digit}
      type="text"
      maxLength={1}
      onChange={(e) => handleChange(e.target.value, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onPaste={handlePaste}
      className={`otp-input ${value[index] ? 'filled' : ''} ${
        haveError ? 'error-text' : ''
      }`}
    />
  ));
};

export default OTPInput;
