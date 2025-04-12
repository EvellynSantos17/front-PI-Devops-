import { useState } from "react";
import { DicListingService, DicService } from "./dictionary/dic-service";

export function UseService() {
  const [service, setService] = useState(DicService);

  const [listService, setListService] = useState(DicListingService);

  function updateOneValueServico({ field, value }) {
    setService((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function updateService(newValue) {
    setService(newValue);
  }

  function updateListService(newValue) {
    setListService(newValue);
  }

  return {
    service,
    listService,
    updateOneValueServico,
    updateService,
    updateListService,
  };
}
