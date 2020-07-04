import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Container, Content, Background, AnimationContainer } from './styles'
import * as Yup from 'yup';

import api from "../../services/api";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import getParsedErrors from '../../utils/ParseErrors';

import { useToast } from '../../hooks/toast'

import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

interface SignUpData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();

	const handleSubmit = useCallback(async (data: SignUpData) => {
		console.log('handleSubmit');
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório'),
				email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
				password: Yup.string().min(6,'A senha precisa ter no mínimo 6 dígitos.')
			});

			await schema.validate(data, {
				abortEarly: false
			});

			await api.post('/users',data);

			addToast({
				type: 'success',
				title: 'Cadastro realizado!',
				description: 'Você já pode fazer seu logon no GoBarber!'
			});

			history.push('/');

		} catch(err) {
			if (err instanceof Yup.ValidationError) {
				const parsedErrors = getParsedErrors(err);
				formRef.current?.setErrors(parsedErrors);
				return;
			}

			addToast({
				type: 'error',
				title: 'Falha ao se cadastrar',
				description: 'Favor verificar suas credenciais.'
			});
		}

	},[addToast]);

	return (
		<Container>
			<Background/>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu cadastro</h1>
						<Input icon={FiUser} name="name" placeholder="Nome"/>
						<Input icon={FiMail} name="email" placeholder="E-mail"/>
						<Input icon={FiLock} name="password" type="password" placeholder="Senha"/>

						<Button type="submit">Cadastrar</Button>
					</Form>

					<Link to="/">
						<FiArrowLeft/>
						Voltar para Logon
					</Link>
				</AnimationContainer>
			</Content>
		</Container>
	);
}

export default SignUp;
