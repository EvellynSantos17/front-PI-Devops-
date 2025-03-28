import ContractedListingService from "@/services/contracted-listing-service";
import ListingService from "@/services/listing-service";
import { useEffect, useState } from "react";

export function FetchFindAll({ query = null, serviceName = "" }) {
  const serviceDict = {
    ContractedListingService: ContractedListingService,
    ListingService: ListingService,
  };

  const [response, setResponse] = useState({});

  async function fetchService() {
    const service = serviceDict[serviceName];
    if (!service) {
      console.error(`Serviço "${serviceName}" não encontrado.`);
      return;
    }
    const response = await service.findAll(query);
    const data = await response.json();
    setResponse(data);
  }

  useEffect(() => {
    fetchService();
  }, []);

  return response;
}
