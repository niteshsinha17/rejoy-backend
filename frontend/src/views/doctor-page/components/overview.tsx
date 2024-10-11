const Overview = ({ overview }: { overview: string }) => {
  return (
    <div className="flex flex-col gap-3 bg-gray-100 p-4 rounded-2xl">
      <div className="space-y-2">
        <div className="font-medium text-black flex gap-1 items-center">Overview</div>
        <div className="">{overview}</div>
      </div>
    </div>
  );
};

export default Overview;
