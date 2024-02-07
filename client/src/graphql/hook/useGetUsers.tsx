import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../queries";

export default function useGetUsers() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  return {
    loading,
    error,
    users: data ? data.getAllUsers : [],
  };
}