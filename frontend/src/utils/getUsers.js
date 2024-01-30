export const getUsers = async () => {
    try {
        const res = await fetch("http://localhost/api/users");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
