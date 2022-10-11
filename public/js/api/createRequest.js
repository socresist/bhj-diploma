/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    if (Object.keys(options).length > 0) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        let url = options ?.url;
        const data = options ?.data;
        const method = options ?.method;

        if (method === 'GET' && url) {
            if (data) {
                url = url + serialise(data);
            }
            try {
                xhr.open('GET', url);
                xhr.send();
            } catch (e) {}
        } else if (method && url) {
            try {
                xhr.open(method, url);
                if (data) {
                    xhr.send(toFormData(data));
                } else {
                    xhr.send();
                }
            } catch (e) {
                options.callback(e);
            }
        }

        xhr.onload = function () {
            let err = null;
            if (xhr.status !== 200) {
                err = new Error(xhr.response.statusText);
            }
            options.callback(err, xhr.response);
        };
    }

    function serialise(obj) {
        let str = '';
        for (const [key, value] of Object.entries(obj)) {
            str = str + `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return str.replace(/^\&/, '?');
    }

    function toFormData(obj) {
        const data = new FormData();
        for (const [key, value] of Object.entries(obj)) {
            data.append(key, value);
        }
        return data;
    }
};