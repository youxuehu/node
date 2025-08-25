import { DataSource } from 'typeorm'

export class SingletonDataSource {
    private static instance: DataSource
    static set(datasource: DataSource) {
        SingletonDataSource.instance = datasource
    }

    static get() {
        return SingletonDataSource.instance
    }
}
