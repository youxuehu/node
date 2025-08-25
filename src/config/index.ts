export interface ServerConfig {
    name: string
    grpc: GrpcConfig
    ws: WsConfig
}

export interface GrpcConfig {
    host: string
    port: number
    enableTls: boolean
    certDir: string
    checkClientCertificate: boolean
}

export interface WsConfig {
    port: number
    host: string
}

export interface DatabaseConfig {
    type: 'sqlite' | 'mysql' | 'postgres'
    database: string
    username?: string
    password?: string
    host?: string
    port?: number
    synchronize?: boolean
    logging?: boolean
}

export interface RedisConfig {
    type: 'redis'
    host: string
    port: number
    db: number
    password?: string
}

export interface AuthConfig {
    user: string
    pass: string
}

export interface MailConfig {
    type: 'smtp'
    host: string
    port: number
    secure: boolean
    auth?: AuthConfig
}
