import React from 'react'
import { Container } from './styles';
import  { ToastMessage } from '../../hooks/toast';
import { useTransition } from 'react-spring';
import Toast from './Toast';

interface ToastContainerProps {
	messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
	const xtMessages = useTransition(
		messages,
		message => message.id,
		{
			from: { right: '-120%' },
			enter: { right: '0%' },
			leave: { right: '-120%' },
		}
	);

	return (
		<Container>
			{xtMessages.map(({ item, key, props }) => (
				<Toast key={key} message={item} style={props} />
			))}
		</Container>
	)
}

export default ToastContainer;