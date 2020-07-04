import React, { createContext, useCallback, useState, useContext } from "react";
import api from '../services/api'

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthState {
	user: UserData;
	token: string;
}

interface UserData {

}

interface AuthContextData {
	user: UserData,
	signIn(credentials:SignInCredentials): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider : React.FC = ({children}) => {
	const [data,setData] = useState<AuthState>(() => {
		const token = localStorage.getItem('@gobarber:token');
		const user = localStorage.getItem('@gobarber:user');

		if (token && user) {
			return { token, user: JSON.parse(user) };
		}

		return {} as AuthState;
	});

	const signIn = useCallback(async ({email, password}) => {
		const response = await api.post<AuthState>('sessions',{email, password});
		const { token, user } = response.data;
		localStorage.setItem('@gobarber:token',token);
		localStorage.setItem('@gobarber:user',JSON.stringify(user));

		setData({ token, user });
	},[]);

	const signOut = useCallback(() => {
		localStorage.removeItem('@gobarber:token');
		localStorage.removeItem('@gobarber:user');
		setData({} as AuthState);
	},[]);

	console.log(data);

	return (
		<AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}

export { AuthContext, AuthProvider, useAuth };