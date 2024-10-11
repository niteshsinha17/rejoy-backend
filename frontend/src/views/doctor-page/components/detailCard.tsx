interface IDetailCardProps {
  heading: string;
  items: string[];
}

const DetailCard = ({ heading, items }: IDetailCardProps) => {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-2xl">
      <div className="space-y-2">
        <div className="font-medium text-black flex gap-1 items-center">{heading}</div>
        <ul className="flex flex-col gap-1 list-disc ml-4">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailCard;
