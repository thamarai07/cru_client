import pathfind from "./PathFinder";

export const FetchDataById = async (id, pat) => {
    try {
        const path = pathfind(pat)
        const response = await fetch(`https://cru-server.onrender.com/fetchbyid${path()}/${id}`);
        if (!response.ok) {
            console.log("Error !!!")
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }

}