import axios from "axios";
import { store } from "../store";
import qs from 'qs';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const request = () => {
	let debug = store.getState().loginReducer.debug;

	return axios.create({
		//baseURL: debug ? appConfig.stagingBaseUrl : appConfig.productionBaseUrl,
		baseURL: "https://shrill-silence-24189-staging.herokuapp.com/api/v1",
		// baseURL: "https://shrill-silence-24189.botics.co/api/v1",
		timeout: 5000,
		withCredentials: false,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			// "Content-Type": "application/x-www-form-urlencoded",
			//"Access-Control-Allow-Origin": '*',
			//"Access-Control-Allow-Methods": 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
		},
	});
}

const requestWithAuth = () => {
	let debug = store.getState().loginReducer.debug;
	let user = store.getState().loginReducer.user;

	return axios.create({
		//baseURL: debug ? appConfig.stagingBaseUrl : appConfig.productionBaseUrl,
		baseURL: "https://shrill-silence-24189-staging.herokuapp.com/api/v1",
		// baseURL: "https://shrill-silence-24189.botics.co/api/v1",
		timeout: 5000,
		withCredentials: false,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Token " + user.token
		},
	});
}

export const HttpRequest = {
	signup(data, role_id) {
		if (role_id == 3) {
			data.role = 3;
			return request().post("/provider/", data);
		} else {
			data.role = 2;
			return request().post("/agent/", data);
		}
	},
	login(data) {
		return request().post("/login/", data);
	},
	getActivityLog(id) {
		return requestWithAuth().get("/activity-logs/?user__id=" + id);
	},
	patientDetail(id) {
		return requestWithAuth().get("/patient/" + id + "/");
	},
	providerList(query) {
		let params = {};
		if (query) {
			params.q = query;
		}

		return requestWithAuth().get("/provider/?" + qs.stringify(params));
	},
	providerDetail(id) {
		return requestWithAuth().get("/provider/" + id + "/");
	},
	agentList(query) {
		let params = {};
		if (query) {
			params.q = query;
		}

		return requestWithAuth().get("/agent/?" + qs.stringify(params));
	},
	agentDetail(id) {
		return requestWithAuth().get("/agent/" + id + "/");
	},
	adminDetail(id) {
		return requestWithAuth().get("/admin/" + id + "/");
	},
	patientList() {
		return requestWithAuth().get("/patient/");
	},
	resourceList() {
		return requestWithAuth().get("/resources-article/");
	},
	getResource(id) {
		return requestWithAuth().get("/resources-article/" + id);
	},
	saveResource(id, data) {
		if (id == null) {
			return requestWithAuth().post("/resources-article/", data);
		} else {
			return requestWithAuth().put("/resources-article/" + id + "/", data);
		}
	},
	surveyList() {
		return requestWithAuth().get("/survey/");
	},
	getSurvey(id) {
		return requestWithAuth().get("/survey/" + id);
	},
	saveSurvey(id, data) {
		if (id == null) {
			return requestWithAuth().post("/survey/", data);
		} else {
			return requestWithAuth().put("/survey/" + id + "/", data);
		}
	},
	saveQuestion(id, data) {
		if (id == null) {
			return requestWithAuth().post("/question/", data);
		} else {
			return requestWithAuth().put("/question/" + id + "/", data);
		}
	},
	saveChoice(id, data) {
		if (id == null) {
			return requestWithAuth().post("/choice/", data);
		} else {
			return requestWithAuth().put("/choice/" + id + "/", data);
		}
	},
	rewardList() {
		return requestWithAuth().get("/campaign/");
	},
	getReward(id) {
		return requestWithAuth().get("/campaign/" + id);
	},
	saveReward(id, data) {
		if (id == null) {
			return requestWithAuth().post("/campaign/", data);
		} else {
			return requestWithAuth().put("/campaign/" + id + "/", data);
		}
	},
	planList(query, type) {
		let params = {};
		if (query) {
			params.plan_name = query;
		}
		if (type) {
			params.type = type;
		}

		return requestWithAuth().get("/plan/?" + qs.stringify(params));
	},
	getPlan(id) {
		return requestWithAuth().get("/plan/" + id);
	},
	patientPlanList(plan_id) {
		return requestWithAuth().get("/patient-plan/?plan=" + plan_id);
	},
	savePlan(id, data) {
		if (id == null) {
			return requestWithAuth().post("/plan/", data);
		} else {
			return requestWithAuth().put("/plan/" + id + "/", data);
		}
	},
	milestoneList(provider_id = null, page_size = 6) {
		let params = {
			page_size: page_size,
		};
		if (provider_id) {
			params.provider__id = provider_id;
		}
		return requestWithAuth().get("/milestone/?" + qs.stringify(params));
	},
	getMilestone(id) {
		return requestWithAuth().get("/milestone/?patient__id=" + id);
	},
	getPatient(id) {
		return requestWithAuth().get("/patient/" + id + "/");
	},
	savePatient(id, data) {
		return requestWithAuth().put("/patient/" + id + "/", data);
	},
	getProvider(id) {
		return requestWithAuth().get("/provider/" + id);
	},
	getProviderLog(id) {
		return requestWithAuth().get("/provider-logs/" + id);
	},
	saveProvider(id, data) {
		return requestWithAuth().put("/provider/" + id + "/", data);
	},
	getAgent(id) {
		return requestWithAuth().get("/agent/" + id);
	},
	getAgentLog(id) {
		return requestWithAuth().get("/agent-logs/" + id);
	},
	saveAgent(id, data) {
		return requestWithAuth().put("/agent/" + id + "/", data);
	},
	getMessage(sender_id, receiver_id) {
		let params = {};
		if (sender_id) {
			params.sender = sender_id;
		}
		if (receiver_id) {
			params.receiver = receiver_id;
		}
		return requestWithAuth().get("/message/?" + qs.stringify(params));
	},
	sendMessage(sender_id, receiver_id, message) {
		let obj = {
			is_removed: false,
			title: "Message",
			body: message,
			seen: true,
			sender: sender_id,
			receiver: receiver_id
		};
		return requestWithAuth().post("/message/", obj);
	},
	taskList(startDate, endDate) {
		let obj = {
			created_lt: endDate,
			created_gt: startDate
		};
		return requestWithAuth().get("/task/?" + qs.stringify(obj));
	},
	saveTask(data) {
		return requestWithAuth().post("/task/", data);
	},
	getBooking(provider_id, startOfWeek, endOfWeek) {
		let params = {};
		if (provider_id) {
			params.provider = provider_id;
		}
		if (startOfWeek) {
			params.start_lt = endOfWeek;
			params.start_gt = startOfWeek;
		}
		return requestWithAuth().get("/booking/?" + qs.stringify(params));
	},
	saveBooking(data) {
		return requestWithAuth().post("/booking/", data);
	},
	roomList(receiver_id) {
		return requestWithAuth().get("/fcm-room/?receiver_id=" + receiver_id);
	},

	getProviderPerformance() {
		let user = store.getState().loginReducer.user;
		return requestWithAuth().get("/provider-performance/" + user.user.id + "/");
	},
	getProviderReachVolume() {
		let user = store.getState().loginReducer.user;
		return requestWithAuth().get("/provider-reach-volume/" + user.user.id + "/");
	},
	getProviderTeamPerformance() {
		let user = store.getState().loginReducer.user;
		return requestWithAuth().get("/provider-team-performance/" + user.user.id + "/");
	},

	assignedPatient() {
		return requestWithAuth().get("/assigned-patient");
	},
	searchPatient(query) {
		return requestWithAuth().get("/patient/?q=" + query);
	},
	getBlockedProvider() {
		return requestWithAuth().get("/block-provider/");
	},
}