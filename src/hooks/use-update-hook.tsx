import { useEffect, useState } from "react";

export function useUpdateHook<T, V>(
  id: number,
  initialPayload: V,
  service: any
): { responseData: T; isLoading: boolean; updateRequest: any } {
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState<T>();
  const [requestData, setRequestData] = useState<V>(initialPayload);

  function updateRequest({ field, value }) {
    setRequestData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  async function fetchData() {
    try {
      const response = await service.update(id, requestData);
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

  return { responseData, isLoading, updateRequest };
}
