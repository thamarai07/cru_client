import pathfind from "./PathFinder";
const UpdatingById = async (data, path) => {
    const pat = pathfind(path)
    const response = fetch(`https://cru-server.onrender.com/updateuser${pat()}/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
       body: JSON.stringify(data)

    })
}

export default UpdatingById;