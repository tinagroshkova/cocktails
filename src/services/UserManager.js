
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.image = "";
        this.favourites = [];
        
    }

    hasCocktail(cocktail) {
        return this.favourites.some(a => a.name === cocktail.name);
    }
    getImage() {
        return this.image;
    }
}


class UserManager {
    constructor() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        this.users = users.map((user) => {
            const newUser = new User(user.username, user.password);
            newUser.image = user.image || "";
            newUser.favourites = user.favourites || [];
            return newUser;
        });
    }

    fetchAllUsers() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.map((user) => {
            const newUser = new User(user.username, user.password);
            newUser.image = user.image || "";
            newUser.favourites = user.favourites || [];
            return newUser;
        });
    }

    registerUser = (username, password) => {
        const userExists = this.users.some((user) => user.username === username);

        if (userExists) {
            return Promise.reject(new Error("Username already exists"));
        }

        const user = new User(username, password,);
        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));
        this.saveUserData();
        return Promise.resolve();
    };

    loginUser = (username, password) => {
        const user = this.users.find((user) => user.username === username && user.password === password);

        if (!user) {
            return Promise.reject(new Error("Invalid username or password"));
        }

        sessionStorage.setItem("loggedInUser", JSON.stringify({
            username: user.username,
        }));
        return Promise.resolve();
    };

    logoutUser = () => {
        sessionStorage.removeItem("loggedInUser");
        return Promise.resolve();
    };

    getLoggedInUser() {
        const userJson = sessionStorage.getItem("loggedInUser");
        if (!userJson) {
            return null;
        }
        const userObj = JSON.parse(userJson);
        const user = this.users.find((u) => u.username === userObj.username);

        if (!user) {
            return null;
        }
        return user;
    }

    saveUserData() {
        const loggedInUser = this.getLoggedInUser();
        if (loggedInUser) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map((user) => {
                if (user.username === loggedInUser.username) {
                    user.image = loggedInUser.image || user.image;
                    user.favourites = loggedInUser.favourites || user.favourites;
                }
                return user;
            });
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        }
    }

    add(cocktail) {
        const user = this.getLoggedInUser();
        if (user && !user.hasCocktail(cocktail)) {
            user.favourites.push(cocktail);
            this.saveUserData();
        }
    }

    remove(cocktail) {
        const user = this.getLoggedInUser();
        if (user && user.hasCocktail(cocktail)) {
            user.favourites = user.favourites.filter(a => a.name !== cocktail.name);
            this.saveUserData();
        }
    }
}
const userManager = new UserManager();

export default userManager;
