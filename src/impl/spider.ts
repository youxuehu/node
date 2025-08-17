import * as t from '../api/spider/types'
import { Api } from '../models'

async function spiderConfig(request: Api.PluginInstallRequest): Promise<t.SpiderConfigResponse> {
	throw 'Unimplemented'
}

async function spiderInstall(request: Api.PluginInstallRequest): Promise<t.SpiderInstallResponse> {
	throw 'Unimplemented'
}

async function spiderRemove(request: Api.PluginUninstallRequest): Promise<t.SpiderRemoveResponse> {
	throw 'Unimplemented'
}

async function spiderSearch(request: Api.ApipluginSearchRequest): Promise<t.SpiderSearchResponse> {
	throw 'Unimplemented'
}

async function spiderUpgrade(request: Api.PluginInstallRequest): Promise<t.SpiderUpgradeResponse> {
	throw 'Unimplemented'
}


const api: t.SpiderApi = {
	spiderConfig,
	spiderInstall,
	spiderRemove,
	spiderSearch,
	spiderUpgrade,
}

export default api
