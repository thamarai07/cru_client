import pathfind from "./PathFinder";

export const DeleteById = async (id, data) => {
    try {
        const path = pathfind(data)
        const response = await fetch(`http://localhost:5000/deleteByid${path()}/${id}`, {
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
