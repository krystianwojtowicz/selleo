import { useState, useRef, useEffect } from 'react';

export default function LiveWriting() {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [enter, setEnter] = useState(false);
  const [outside, setOutside] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEnter(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOutside(true);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="m-[20px]">
      {!open && (
        <button
          onClick={(e: any) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          placeholder
        </button>
      )}
      {open && (
        <input
          ref={inputRef}
          type="text"
          className="border-[1px] block"
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      )}
      {text && (outside || enter) && <p>{text}</p>}
    </div>
  );
}
