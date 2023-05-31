class FacePassWebSDK {
    constructor(token, domain, webSdkContainer) {
        this.token = token;
        this.domain = domain;
        this.webSdkContainer = webSdkContainer;
    }

    init() {
        fetch(`${this.domain}/enrollment/web-sdk`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            })
        })
            .then((response) => {
                return new Promise((resolve) => response.json()
                    .then((json) => resolve({
                        status: response.status,
                        ok: response.ok,
                        json
                    })));
            })
            .then(({status, json, ok}) => {
                    ok ? this.openIframe(json.iframeUrl) : this.webSdkContainer.append(json.message)
                }
            )
    }

    openIframe(iframeUrl) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute("src", iframeUrl);
        iframe.allow = 'autoplay; camera;'
        iframe.style.position = "fixed";
        iframe.style.border = "none";
        iframe.style.height = "80vh";
        iframe.style.width = "100vw";
        this.webSdkContainer.appendChild(iframe);
    }
}