import { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import useGetUsers from "../graphql/hook/useGetUsers";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graphql/mutations";
import { ApolloError } from "@apollo/client/errors";
import pinkCity from "../assets/picture/pink.png";
import greenCity from "../assets/picture/green.png";
import snowCity from "../assets/picture/snow.png";

function UserPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const { users, loading, error } = useGetUsers();

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      // Call the UPDATE_USER mutation here
      const { data } = await updateUserMutation({
        variables: {
          id: userId,
          role: newRole,
        },
      });

      if (data) {
        console.log("Utilisateur mis à jour :", data.updateUser);
      } else {
        console.error("La réponse de la mutation est null ou undefined.");
      }
    } catch (error: ApolloError | any) {
      console.error("Failed to update user:", error.message);
    }
  };

  return (
    <div
      className={`container relative flex flex-col items-center xl:justify-center md:h-screen w-full px-9 md:pt-10 md:pl-16 md:pr-0 xl:pl-0 2xl:pb-[120px] xl:pt-0 2xl:pt-16 mx-auto
     ${isRegisterMode ? "mb-[160px] md:pb-8 md:mb-0" : ""}`}
    >
      <form
        className="mt-8 xl:mt-0 max-w-sm flex flex-col w-full relative z-10"
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        {isRegisterMode ? <Signup /> : <Login />}
      </form>
      <p
        className="text-center text-base-content cursor-pointer justify-center items-center mt-4 relative z-10 hover:text-[#ed9986]"
        onClick={toggleMode}
      >
        {isRegisterMode
          ? "Déjà un compte ? Se connecter"
          : "Pas de compte ? S'inscrire"}
      </p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select select-ghost w-full max-w-xs"
                    value={user.role || ""}
                    onChange={(e) => {
                      const newRole = e.target.value;
                      handleRoleChange(user.id, newRole);
                    }}
                  >
                    <option disabled selected>Attribuer un rôle</option>
                    <option value="user">user</option>
                    <option value="superuser">superuser</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div>
        <div className="absolute right-0 bottom-0 h-auto hidden md:block md:w-[388px] lg:w-[341px] xl:w-[420px] 2xl:w-[510px] opacity-50 border border-[#ffffff59] rounded-[50%]">
          <img src={snowCity} alt="" />
        </div>
        <div className="absolute bottom-0 left-1/2 translate-x-[-50%] hidden lg:block lg:w-[341px] h-auto xl:w-[425px] 2xl:w-[512px] opacity-50">
          <img src={greenCity} alt="" />
        </div>
        <div className="absolute left-0 bottom-0 h-auto md:w-[388px] hidden md:block lg:w-[341px] xl:w-[420px] 2xl:w-[510px] opacity-50">
          <img src={pinkCity} alt="" />
        </div>
      </div> */}
    </div>
  );
}

export default UserPage;
