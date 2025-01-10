import jwt from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};

export const verifyToken = (token: string): object | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch {
    return null;
  }
};
