interface Props {
  data: string[];
  onClick: (value: string) => void;
}

export default function AutoComplete({ data, onClick }: Props) {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <ul className='absolute w-full bg-base-content text-base-100 max-h-24 overflow-y-scroll border rounded-b-lg'>
      {data.map((value, index) => (
        <li
          onClick={() => onClick(value)}
          key={index}
          className='p-1 cursor-pointer hover:bg-primary'
        >
          {value}
        </li>
      ))}
    </ul>
  );
}
