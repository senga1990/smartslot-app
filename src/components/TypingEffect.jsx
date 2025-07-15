import { useEffect, useState } from 'react';

const TypingEffect = ({ text = '', speed = 60 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <>
      <pre
        style={{
          color: '#00ffcc',
          fontFamily: 'Courier New',
          fontSize: '0.85rem',
          whiteSpace: 'pre-wrap',
        }}
      >
        {displayedText}
        <span className="blink">|</span>
      </pre>

      <style>{`
        .blink {
          animation: blinkCursor 1s step-start infinite;
        }

        @keyframes blinkCursor {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default TypingEffect;
