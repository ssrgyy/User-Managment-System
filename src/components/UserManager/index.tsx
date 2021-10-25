import React, { useState } from "react";
import { UserManagerState } from "./types";
import { UserManagerContext } from "./UserManagerContext";

export const UserManager: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<UserManagerState>();

    return (
        <UserManagerContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserManagerContext.Provider>
    );
}