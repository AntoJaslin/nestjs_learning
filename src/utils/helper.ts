import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const sendError = (
  res: Response,
  error,
  status = HttpStatus.BAD_REQUEST,
) => {
  return res.status(status).send({
    status,
    error: error?.message || error,
  });
};

export const sendData = (
  res: Response,
  data,
  message = 'Data retrieved successfully',
  status = HttpStatus.OK,
) => {
  const final_data: any = { status, message, data };
  return res.status(status).send(final_data);
};
