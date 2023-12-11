import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_ONE_CITY } from "../queries";
import {
  GetCityByQuery,
  GetCityByQueryVariables,
} from "../__generated__/graphql";

interface GetOneCityByArgs
  extends QueryHookOptions<GetCityByQuery, GetCityByQueryVariables> {}

export default function useGetCityBy(options: GetOneCityByArgs = {}) {
  const { loading, error, data } = useQuery(GET_ONE_CITY, { ...options });

  return {
    loading,
    error,
    city: data?.getCityBy!,
  };
}
