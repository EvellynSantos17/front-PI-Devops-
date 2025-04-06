import ContractedListingService from "@/services/contracted-listing-service";
import ListingService from "@/services/listing-service";
import UserProfileService from "@/services/user-profile-service";
import { useEffect } from "react";

export default function FetchFindById({ serviceName, id, onDataFetched, status }) {
  const service = {
    ListingService: ListingService,
    ContractedListingService: ContractedListingService,
    UserProfileService: UserProfileService,
  };

  
  async function fetchData() {
    try {
      const responseFetch = await service[serviceName].findById(id);
      const data = await responseFetch.json();
      if (onDataFetched) {
        onDataFetched(data);
      }
      status(responseFetch.status)
      return;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return null;
}
