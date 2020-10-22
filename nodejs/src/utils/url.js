export function getBackendApiUrl(url) {
	return url;
}

export function addQueryString(url, param, val) {
	if (url.indexOf('?') > 0) {
		url += "&" + param + "=" + val;
	} else {
		url += "?" + param + "=" + val;
	}
	return url;
}

export var default_headers = {headers: {'Content-type': 'application/json;charset=UTF-8' }}
