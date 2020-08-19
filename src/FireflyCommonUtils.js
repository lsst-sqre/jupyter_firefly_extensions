import {initFirefly} from 'firefly-api-access';
import { PageConfig} from '@jupyterlab/coreutils';
import {ServerConnection} from '@jupyterlab/services';


export function addFirefly()  {
    console.log("In addFirefly()");
    // This doesn't work in JL 2.x
    // if (!PageConfig && !PageConfig.getOption('fireflyLabExtension')) return;
    // const fireflyURL= PageConfig.getOption('fireflyURL') || 'http://localhost:8080/firefly';
    // const channel= PageConfig.getOption('fireflyChannel');
    const baseURL = PageConfig.getOption('baseURL');
    const fetch = ServerConnection.fetch;

    let resp = await fetch(baseUrl + "rubin/settings")
    if (response.ok) {
	let settings = await response.json()
    } else {
	alert("Error: " + response.status);
    }
    console.log("Settings response: " + settings)
    const fireflyURL = settings.firefly_url_lab;
    const channel = settings.firefly_channel_lab;

    window.firefly= Object.assign({}, window.firefly, {wsch:channel});
    if (!window.getFireflyAPI) {
	console.log("window.getFireflyAPI calling initFirefly(" + fireflyURL + ").");
        window.getFireflyAPI= initFirefly(fireflyURL);
    }
    console.log("addFirefly returning: "+ {fireflyURL, channel}+ ".");
    return {fireflyURL, channel};
}


export function buildURLErrorHtml(e) {
    const details= `<br>Set the firefly URL by setting <code>c.Firefly.url</code> in 
                    <code>jupyter_notebook_config.py</code>
                    <br>or the environment variable <code>FIREFLY_URL</code>`;
    return `<div style='padding: 30px 0 0 30px'>${e.message}${details}</div>`;
}
