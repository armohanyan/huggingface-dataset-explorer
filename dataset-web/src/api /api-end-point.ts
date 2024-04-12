import axios, {AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders} from 'axios'

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL
export class ApiEndPoint<ResponseType = void> {
	constructor(
		private config: AxiosRequestConfig,
		private withDefaultAuth = true
	) {}

	private get defaultConfig() {
		const headers: RawAxiosRequestHeaders = {}

		if (this.withDefaultAuth) {
			const accessToken = JSON.parse(localStorage.getItem('auth')!)?.accessToken

			if (accessToken) {
				headers.authorization = `Bearer ${accessToken}`
			}
		}

		return {
			baseURL: BASE_URL,
			timeout: 100000,
			headers
		}
	}

	private async requestInternal(
		retryAfterTokenRefresh = false
	): Promise<AxiosResponse<ResponseType>> {
		const config = { ...this.defaultConfig, ...this.config}

		try {
			return await axios(config)
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (!retryAfterTokenRefresh && err.response?.status === 401) {
					return await this.requestInternal(true)
				}
			}

			throw err
		}
	}

	request() {
		return this.requestInternal()
	}

	async requestData(): Promise<ResponseType> {
		const response = await this.request()

		return response.data
	}
}
