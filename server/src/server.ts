import 'reflect-metadata';

import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import appointmentsRoutes from "./routes/appointments.routes";
import usersRoutes from "./routes/users.routes";
import sesionRoutes from "./routes/sessions.routes";
import './database';
import configUpload from './configs/upload';
import AppError from './errors/AppError';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/appointments',appointmentsRoutes);
app.use('/users',usersRoutes);
app.use('/sessions',sesionRoutes);
app.use('/files', express.static(configUpload.directory));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message
		});
	}

	console.log(err);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error'
	});
});

app.listen(3333,ev => {
	console.log('listening 3333');
})