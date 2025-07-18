function pathfind(pat) {
    return () => {
        const routes = {
            "/recipe": "Recipe",
            "/user": "s"
        };

        if (!pat) {
            console.log("Path is empty");
            return "Empty";
        }

        const resolved = routes[pat] || "Unknown Path";
        return resolved;
    };
}


export default pathfind