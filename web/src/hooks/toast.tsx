import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
	addToast(message: ToastMessageParams): void;
	removeToast(id: string): void;
}

export interface ToastMessage extends ToastMessageParams {
	id: string;
}

interface ToastMessageParams {
	type?: 'success' | 'error' | 'info';
	title: string;
	description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
	const [messages,setMessages] = useState<ToastMessage[]>([]);

	const addToast = useCallback(async ({ type, title, description }: ToastMessageParams) => {
		const message = {id: uuid(), type, title, description};
		setMessages(_messages => [..._messages,message]);
	},[]);

	const removeToast = useCallback(async ( id: string ) => {
		setMessages(_messages => _messages.filter(message => message.id != id));
	},[]);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer messages={messages} />
		</ToastContext.Provider>
	)
}

function useToast() {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}

export { ToastContext, ToastProvider, useToast };