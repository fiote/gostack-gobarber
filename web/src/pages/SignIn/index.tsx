import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container, Content, AnimationContainer, Background } from './styles'
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import getParsedErrors from '../../utils/ParseErrors';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Link } from 'react-router-dom';

interface FormDataCredentials {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const auth = useAuth();
	const { addToast } = useToast();
	const history = useHistory();

	const handleSubmit = useCallback(async (data: FormDataCredentials) => {
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
				password: Yup.string().required('Senha obrigatória')
			});

			await schema.validate(data, {
				abortEarly: false
			});

			const {email, password} = data;
			await auth.signIn({ email, password });

			history.push('/dashboard');

		} catch(err) {
			if (err instanceof Yup.ValidationError) {
				const parsedErrors = getParsedErrors(err);
				formRef.current?.setErrors(parsedErrors);
				return;
			}

			addToast({
				type: 'error',
				title: 'Falha ao Logar',
				description: 'Favor verificar suas credenciais.'
			});
		}
	},[auth, addToast]);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu logon</h1>

						<Input icon={FiMail} name="email" placeholder="E-mail"/>
						<Input icon={FiLock} name="password" type="password" placeholder="Senha"/>

						<Button type="submit">Entrar</Button>
						<a href="forgot">Esqueci minha senha</a>
					</Form>

					<Link to="/signup">
						<FiLogIn/>
						Criar conta
					</Link>
				</AnimationContainer>
			</Content>
			<Background/>
		</Container>
	);
}

export default SignIn;