import {initFirefly} from 'firefly-api-access';
import { PageConfig} from '@jupyterlab/coreutils';



export function addFirefly()  {
    // This doesn't work in JL 2.x
    // if (!PageConfig && !PageConfig.getOption('fireflyLabExtension')) return;
    // const fireflyURL= PageConfig.getOption('fireflyURL') || 'http://localhost:8080/firefly';
    // const channel= PageConfig.getOption('fireflyChannel');
    const fireflyURL= "https://lsst-demo.ncsa.illinois.edu/firefly/";
    const channel= 'florbledifloo';

    window.firefly= Object.assign({}, window.firefly, {wsch:channel});
    if (!window.getFireflyAPI) {
        window.getFireflyAPI= initFirefly(fireflyURL);
    }
    return {fireflyURL, channel};
}


export function buildURLErrorHtml(e) {
    const details= `<br>Set the firefly URL by setting <code>c.Firefly.url</code> in 
                    <code>jupyter_notebook_config.py</code>
                    <br>or the environment variable <code>FIREFLY_URL</code>`;
    return `<div style='padding: 30px 0 0 30px'>${e.message}${details}</div>`;
}
