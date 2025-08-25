// @ts-ignore
import { KeyType, Redis, ValueType } from 'ioredis'
import { RedisConfig } from '../../config'

/**
 * 这是一个 redis 缓存 CURD 的类
 */
export class RedisClient {
    /**
     * _redisCli
     * @private
     */
    private _redisCli: Redis

    /**
     * 这是一个构造函数
     * @param redisConfig {@link RedisConfig}
     */
    constructor(redisConfig: RedisConfig) {
        this._redisCli = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.password,
            db: redisConfig.db
        })
    }

    /**
     * 写缓存
     * @param key  缓存 key {@link KeyType}
     * @param value 缓存 value {@link ValueType}
     * @param expiryMode 'EX'
     * @param time 验证码失效时间（单位：秒）
     */
    async set(key: KeyType, value: ValueType, expiryMode?: string | any[], time?: number | string): Promise<boolean> {
        try {
            // @ts-ignore
            await this._redisCli.set(key, value, expiryMode, time)
            console.log('set success')
            return true
        } catch (error) {
            console.log(`set error key=${key}, value=${value}`, error)
            return false
        }
    }

    /**
     * 读缓存
     * @param key {@link KeyType} 缓存keu
     * @returns {@link ValueType} 对应的缓存 value
     */
    async get(key: KeyType): Promise<ValueType> {
        try {
            const value = await this._redisCli.get(key)
            return value ? value : null
        } catch (error) {
            console.error(`get value error ${key}`, error)
            return null
        }
    }
}
