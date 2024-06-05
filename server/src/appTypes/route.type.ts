import { NextFunction, Request, Response } from 'express';

export type RouteCallBack = (req: Request, res: Response, next: NextFunction) => any;