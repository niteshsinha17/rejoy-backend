import { BoxLoader } from "@/components";

const Loader = () => {
  return (
    <div>
      <div className="border rounded-lg shadow-sm">
        <div className="h-[70px] px-4 border-b flex items-center">
          <BoxLoader
            height={16}
            width="50%"
            maxWidth={500}
          />
        </div>

        <div className="p-4 px-4 flex flex-col gap-3">
          <BoxLoader
            height={14}
            maxWidth={400}
          />
          <BoxLoader
            height={14}
            maxWidth={400}
          />
          <BoxLoader
            height={14}
            maxWidth={400}
          />
          <BoxLoader
            height={14}
            maxWidth={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
