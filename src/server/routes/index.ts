import { Exception } from '@core/exception';
import { NextFunction, Request, Response, Router } from 'express';
import { HeroRoutes } from './hero';

const routes = Router();

routes.use('/hero',HeroRoutes)

// handle errors
routes.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    res.status(400).json({
      message: err.message,
    });
  } else {
    next(err);
  }
});

// handle errors
routes.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    error: err,
  });
});

export default Router().use('/api/v1', routes);
