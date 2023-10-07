import { useMutation } from "@apollo/client";
import { ADD_CITY } from "../mutations";
import CustomToast from "../../components/CustomToast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GET_CITIES } from "../queries";

export default function useCreateCity() {
  const navigate = useNavigate();
  const [createCity] = useMutation(ADD_CITY, {
    onCompleted: ({ createCity }) => {
      toast(
        <CustomToast
          message={`La ville de "${createCity.name}" a été ajoutée`}
          color='text-success'
        />
      );
      navigate(`/city/${createCity.id}`);
    },
    onError: (error) => {
      toast(<CustomToast message={error.message} color='text-error' />);
    },
    refetchQueries: [{ query: GET_CITIES }],
  });

  return {
    createCity,
  };
}
