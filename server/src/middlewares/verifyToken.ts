import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import configAuth from '../configs/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
	iat: number,
	exp: number,
	sub: string
}

export default function verifyToken(request: Request, response : Response, next: NextFunction) {
	const authHeader = request.headers.authorization;
	if (!authHeader) throw new AppError("Authorization header is missing.", 401);
	const { secret } = configAuth.jwt;
	const [,token] = authHeader.split(' ');
	try {
		const decoded = verify(token, secret);
		const { sub } = decoded as TokenPayload;
		request.user = { id: sub };
		return next();
	} catch {
		throw new AppError("Invalid JWT token", 401);
	}


}