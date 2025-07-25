import pathfind from "./PathFinder";


export const FetchAll = async (data) => {
  try {
    const pat = pathfind(data)
    const response = await fetch(`https://cru-server.onrender.com/getall${pat()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error(" Error fetching users:", error.message);
    return [];
  }
};
