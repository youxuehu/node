import { Logger } from 'winston'
import { SingletonLogger } from '../facade/logger'
import * as Minio from 'minio';
import { stringToBoolean } from '../../common/string';

export class MinioService {
    private logger: Logger = SingletonLogger.get()

    async getClient() {
        const endPoint = process.env.MINIO_ENDPOINT || '127.0.0.1'
        const accessKey = process.env.MINIO_ACCESS_KEY || 'H9zLWI2iXRGIeO46QmLW'
        const secretKey = process.env.MINIO_SECRET_KEY || 'gQyqHBJpyWI0CJ3jdOi8K3vI41JLctuFPFCCuWtE'
        const useSSL = process.env.MINIO_USE_SSL || 'false'
        
        const minioClient: Minio.Client = new Minio.Client({
            endPoint: endPoint, 
            port: 9000,
            useSSL: stringToBoolean(useSSL),
            accessKey: accessKey,
            secretKey: secretKey,
        });
        return minioClient
    }

    async getUrl(filename: string): Promise<string> {
        const bucketName = process.env.MINIO_BUCKET || 'public-bucket';
        
        // ✅ 先 await 得到 client 实例
        const client = await this.getClient();
        
        // ✅ 再调用 presignedPutObject
        const url = await client.presignedPutObject(
            bucketName,
            filename,
            3600 // 1小时有效
        );

        return url;
    }
    
}
