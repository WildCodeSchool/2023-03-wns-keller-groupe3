interface Props {
  suggestions: string[];
  onClick: (city: string) => void;
}

export default function SuggestedCities({ suggestions, onClick }: Props) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  return (
    <ul className='absolute w-full bg-base-content text-base-100 h-34 overflow-y-scroll border rounded-b-lg'>
      {suggestions.map((city, index) => (
        <li
          onClick={() => onClick(city)}
          key={index}
          className='p-1 cursor-pointer hover:bg-primary'
        >
          <p className='text-base-100'>{city}</p>
        </li>
      ))}
    </ul>
  );
}
