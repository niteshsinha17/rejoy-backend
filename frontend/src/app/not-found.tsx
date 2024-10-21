const NotFound = () => {
  return (
    <div className="h-svh">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex gap-2 items-center">
          <div className="text-xl text-black">404</div>
          <div className="border-l pl-2">
            <div className="text-xl text-black">Page Not Found</div>
            <p className="text-sm text-slate-500">Could not find requested resource</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
