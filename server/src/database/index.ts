import { createConnection } from 'typeorm';

console.log('creating connection...');;
createConnection().then(connection => {
	console.log('connection created');
});