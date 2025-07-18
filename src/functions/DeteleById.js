import pathfind from "./PathFinder";

export const DeleteById = async (id, data) => {
    try {
        const path = pathfind(data)
        const response = await fetch(`https://cru-server.onrender.com/deleteByid${path()}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            console.log("Delete UnSuccessfully");
        }
    } catch (error) {
        console.log(error);
    }
};
