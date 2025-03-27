
import ContractedListingService from "@/services/contracted-listing-service";
import ListingService from "@/services/listing-service";
import { useEffect, useState } from "react";

export function FetchFindAll({
  query = null,
  serviceName = ''
}) {

  let response 

  const serviceDict = {
    ContractedListingService: ContractedListingService,
    ListingService: ListingService
  }

  async function fetchService() {
    const service = serviceDict[serviceName];
    if (!service) {
      console.error(`Serviço "${serviceName}" não encontrado.`);
      return;
    }
    const response = await service.findAll(query);
    response = await response.json();
  }

  useEffect(() => {
    fetchService();
  }, []);
  

  return response
}
