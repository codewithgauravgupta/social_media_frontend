import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
	getAccessToken,
	getRefreshToken,
} from "../hooks/user.actions";

const axiosService = axios.create({
	baseURL: "http://ec2-13-238-194-209.ap-southeast-2.compute.amazonaws.com:8000/",
	headers: {
		"Content-Type": "application/json",
	},
});

axiosService.interceptors.request.use(async (config) => {
	/**
	  * Retrieving the access token from the localStorage and adding it to the headers of the request
	*/
	// const { access } = JSON.parse(localStorage.getItem("auth"));
	// config.headers.Authorization = `Bearer ${access}`;
	config.headers.Authorization = `Bearer ${getAccessToken()}`;
	return config;
});

axiosService.interceptors.response.use(
	(res) => Promise.resolve(res),
	(err) => Promise.reject(err)
);

const refreshAuthLogic = async (failedRequest) => {
	// const { refresh } = JSON.parse(localStorage.getItem("auth"));
	return axios
		.post("/refresh/token/", null, {
			baseURL: "http://ec2-13-238-194-209.ap-southeast-2.compute.amazonaws.com:8000/",
			headers: {
				// Authorization: `Bearer ${refresh}`,
				Authorization: `Bearer ${getRefreshToken()}`,
			},
		})
		.then((resp) => {
			const { access, refresh } = resp.data;
			failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
			localStorage.setItem("auth", JSON.stringify({ access, refresh }));
		})
		.catch(() => {
			localStorage.removeItem("auth");
		});
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url) {
	return axiosService.get(url).then((res) => res.data);
}

export default axiosService;