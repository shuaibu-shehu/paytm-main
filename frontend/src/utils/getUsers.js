export const getUsers = async () => {
    setLoading(true);
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const res = await fetch(
      `http://localhost:3000/api/users?filter=${search}`,
      { headers }
    );

    return res.json();
}