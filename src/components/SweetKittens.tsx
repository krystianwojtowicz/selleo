import { useEffect, useState } from 'react';

export default function SweetKittens() {
  const [textInput, setTextInput] = useState('');
  console.log(textInput);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      setTextInput((prevText) => prevText + event.key);
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <div
      //   tabIndex={0}
      className="flex justify-center min-h-[95vh]"
    >
      <header>Sweet kittens</header>
    </div>
  );
}
