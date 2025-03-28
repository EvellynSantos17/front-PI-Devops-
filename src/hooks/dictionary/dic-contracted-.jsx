import { DicPage } from "./dic-page"

export const DicContracted = {
  id: null,
  status: null,
  clientRequest: null,
  startedAt: null,
  finishedAt: null,
  listingId: null,
  clientId: null
}


export const DicContractedDetailed = {
  ...DicContracted,
  listingService: {}
}

export const DicListingContracted = {
  content:[{
    ...DicContracted
  }],
  page: DicPage
}

export const DicListingContractedDetailed = {
  content:[{
    ...DicContracted,
    listingService: {
      id: null,
      title: null,
      price: null,
      creationDate: null,
      location: null,
      description: null,
    }
  }],
  page: DicPage
}