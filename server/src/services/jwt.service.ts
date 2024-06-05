import jwt from 'jsonwebtoken';

function sign(user: { id: string, email: string; }) {
  const token = jwt.sign(
    user, 
    process.env.JWT_KEY as string,
    { expiresIn: '1h'}
    );

  return token;
}

function verify(token: string): jwt.JwtPayload | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as jwt.JwtPayload;

    return payload;
  } catch (err) {
    return null;
  }
}

export const jwtService = {
  sign,
  verify
};
