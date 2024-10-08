import { useState } from "react";

const useLoader = () => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    start: () => setLoading(true),
    stop: () => setLoading(false),
  };
};

export default useLoader;
