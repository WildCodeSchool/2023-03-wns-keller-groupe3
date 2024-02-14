import { QueryHookOptions, useQuery } from "@apollo/client";
import { GET_USER } from "../queries";
import {
  GetUserByQuery,
  GetUserByQueryVariables,
} from "../__generated__/graphql";

interface GetOneCityByArgs
  extends QueryHookOptions<GetUserByQuery, GetUserByQueryVariables> {}

export default function useGetUser(options: GetOneCityByArgs = {}) {
  const { loading, error, data } = useQuery(GET_USER, {
    ...options,
  });

  const isLogged = data?.getUserBy?.email?.length! > 0;
  const userRole = data?.getUserBy.role;
  const userCityId = data?.getUserBy.city?.id;

  return {
    loading,
    error,
    isLogged,
    userRole,
    userCityId,
    user: data?.getUserBy!,
  };
}
