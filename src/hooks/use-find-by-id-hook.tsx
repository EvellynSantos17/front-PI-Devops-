import { useEffect, useState } from "react";

export function useFindByIdHook<T>(id:number, service:any): {responseData: T, isLoading: boolean} {
  let initialData: T;
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState<T>(initialData);

  async function fetchData() {
    try {
      const response = await service.findById(id);
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error(`Error fetching`, error);
    }
  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [id]);

  return {responseData, isLoading};
}
