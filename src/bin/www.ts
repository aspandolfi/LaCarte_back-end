import * as http from 'http';
import 'reflect-metadata';
import 'es6-shim';
import { Container } from 'typedi';
import { useContainer, createConnections } from 'typeorm';
import { app } from './app';

useContainer(Container);

const port = process.env.PORT || 8082;

http.createServer(app).listen(port, () => console.log('Server started on port ' + port));