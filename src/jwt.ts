import * as jwt from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || '1d2f$#*%T$#erwsf$##h}}s9h3b'
const ttl = 3600 * 24 * 12

interface JwtPayload {
  id: number
  role: string
}

export const sign = (data: JwtPayload) =>
  jwt.sign(data, secret, { expiresIn: ttl })

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload
