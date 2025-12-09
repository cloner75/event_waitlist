import { useState, useEffect } from 'react';

export default function RandomOnline() {
  const [number, setNumber] = useState(Math.random() * (100 - 20 + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
      setNumber(random);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <>{number.toFixed(0.4)}</>;
}
