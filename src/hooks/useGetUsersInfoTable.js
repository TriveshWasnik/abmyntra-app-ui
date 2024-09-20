import axios from "axios";
// this hook Get all the users
async function useGetUsersInfoTable() {
  try {
    let resTable = [];
    const res = await axios.get(
      "https://abmyntra-api.onrender.com/api/v1/user/profiles",
      {
        withCredentials: true,
      }
    );
    res.data.users.map((item) => {
      const obj = {
        id: item._id,
        name: item.name,
        email: item.email,
        mobile: item.phoneNumber,
        status: item.status,
      };
      resTable.push(obj);
    });
    return resTable;
  } catch (error) {
    console.log(error);
  }
}

export default useGetUsersInfoTable;
