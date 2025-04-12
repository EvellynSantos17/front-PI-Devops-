import { DicPage } from "./dic-page";

export const DicContracted = {
  id: null,
  status: null,
  clientRequest: null,
  startedAt: null,
  finishedAt: null,
  listing: {
    id: null,
    title: null,
    price: null,
    description: null,
    location: null,
    creationDate: null,
    userProfile: {
      id: null,
      name: null,
      description: null,
      title: null,
    },
    skills: null,
    contractedListings: null,
  },
  client: {
    id: null,
    name: null,
    phone: null,
    address: null,
    postalCode: null,
    skills: null,
    document: null,
    description: null,
    title: null,
  },
  evaluation: {
    id: null,
    comment: null,
    stars: null,
    contractedListingId: null,
  },
};

export const DicListingContracted = {
  content: [
    {
      ...DicContracted,
    },
  ],
  page: DicPage,
};
