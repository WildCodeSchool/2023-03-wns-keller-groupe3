import { useQuery } from "@apollo/client";
import { GET_CITIES } from "../queries";

export default function useGetCities() {
  const { loading, error, data } = useQuery(GET_CITIES);
  return {
    loading,
    error,
    cities: data ? data.getAllCities : [],
  };
}
