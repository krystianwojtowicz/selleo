import { useEffect, useState } from 'react';

export default function SweetKittens() {
  const [textInput, setTextInput] = useState('');
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    const handleKeyPress = (event: KeyboardEvent) => {
      clearTimeout(timerId);

      if (event.key === 'Escape') {
        setTextInput('');
      } else {
        setTextInput((prev) => prev + event.key);
      }

      timerId = setTimeout(() => {
        setTextInput('');
      }, 5000);
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (textInput.indexOf('injects3crets') > -1) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            'https://api.github.com/repos/elixir-lang/elixir/issues',
          );

          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await res.json();
          setData(jsonData.slice(0, 5));

          setTimeout(() => {
            setData(null);
          }, 15000);
        } catch (error) {
          console.error('There was a problem:', error);
        }
      };

      fetchData();
    }
  }, [textInput]);

  return (
    <div>
      <header className="text-center">Sweet kittens</header>
      {data && (
        <ul className="mt-[20px]">
          {data.map((el: any) => (
            <li className="text-center" key={el.id}>
              <div className="mt-[10px]">
                <h1>issue: {el.title}</h1>
                <h1>user: {el.user.login}</h1>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
