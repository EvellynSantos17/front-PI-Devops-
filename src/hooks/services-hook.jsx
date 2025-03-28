import ContractedListingService from "@/services/contracted-listing-service";
import ListingService from "@/services/listing-service";
import { useEffect, useState } from "react";

export function UseServiceHook({
  contracted = null,
  accountId = null,
  title = null,
  page = 0,
  size = 6,
}) {
  const [serviceData, setServiceDate] = useState({
    titulo: "",
    tipo: "",
    valor: "",
    dt_limite: "",
    localizacao: "",
    requisitos: "",
    descricao: "",
    termos: false,
  });

  function updateServiceDateUnitValue({ field, value }) {
    setServiceDate((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  const [paginationService, setPaginationService] = useState({
    content: [
      {
        id: "",
        title: "",
        price: 0,
        description: "",
        location: "",
        creationDate: "",
        userProfile: {
          id: null,
          name: "",
          description: "",
          title: "",
        },
      },
    ],
    page: {
      size: 0,
      number: 0,
      totalElements: 0,
      totalPages: 0,
    },
  });

  async function fetchData() {
    const query = {
      ...(page ? { page } : {}),
      ...(size ? { size } : {}),
      ...(title ? { title } : {}),
      ...(accountId ? { accountId } : {}),
    };

    if (contracted) {
      let response = await ContractedListingService.findAll(query);
      const data = await response.json();

      setPaginationService(data);
      return;
    }

    let response = await ListingService.findAll(query);

    const data = await response.json();

    setPaginationService(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { updateServiceDateUnitValue, serviceData, paginationService };
}
