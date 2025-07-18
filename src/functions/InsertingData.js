import pathfind from "./PathFinder";

export const Inserting = async (data, path) => {

    try {
        const sub = pathfind(path)
        const response = await fetch(`https://cru-server.onrender.com/insert${sub()}`, {
            method: "POST", headers: {
                "Content-type": "application/json"
            }, body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        
        console.error(" Error fetching users:", error.message);
        return [];
    }
};
