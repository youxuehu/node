import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SingletonLogger } from '../domain/facade/logger';
import { Logger } from 'winston'

// 豁免路径列表（不需要鉴权的接口）
const PUBLIC_ROUTES = ['/v1/auth/challenge', '/v1/auth/verify'];
interface JwtPayload {
  address: string;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = SingletonLogger.get()
  // 检查是否是豁免路径
  if (PUBLIC_ROUTES.includes(req.path)) {
    return next(); 
  }
  // 从请求头中获取 token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 格式：Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token missing, Please connect your wallet to obtain a token' });
  }

  // 验证 JWT
  jwt.verify(token, process.env.JWT_SECRET || 'e802e988a02546cc47415e4bc76346aae7ceece97a0f950319c861a5de38b20d', (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token, Please connect your wallet to retrieve the token again' });
    }

    // 将用户信息附加到请求对象上，供后续处理函数使用
    req.user = payload as JwtPayload;
    next(); // 继续执行后续路由处理
  });
};

export default authenticateToken;