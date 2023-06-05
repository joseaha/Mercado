import React, { createContext, useState } from 'react';

interface User {
  Usuario: string;
  Pss: string;
  Correo: string;
  numeroTarjeta: string;
  codigoSeguridad: number;
  fechaVencimiento: string;
}

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }
  

