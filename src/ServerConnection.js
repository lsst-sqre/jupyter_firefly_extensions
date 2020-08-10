import {addFirefly} from './FireflyCommonUtils.js';
import {initFirefly} from 'firefly-api-access';
import { PageConfig} from '@jupyterlab/coreutils';

var widgets = require('@jupyter-widgets/base');



export const ServerConnectionModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'ServerConnectionModel',
        _view_name : 'ServerConnection',
        _model_module : 'jupyter-firefly',
        _view_module : 'jupyter-firefly',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

export const ServerConnection = widgets.DOMWidgetView.extend({

    render() {
	const modelUrl = this.model.get('url');
        console.log("ServerConnection URL: " + modelUrl);
	// PageConfig doesn't work right in 2.x
      
        // this.usingLabExt= PageConfig && PageConfig.getOption('fireflyLabExtension');
	// Just assume lab ext is true
	this.usingLabExt = true;
	console.log("Using Lab ext: " + this.usingLabExt);
	// We need, at least in the 2.x world, to talk to a custom handler
	//  to get the fireflyURL setting.
	this.connectedURL= "/portal"; // FIXME need the magic here.
	this.connectedURL= "https://lsst-demo.ncsa.illinois.edu/firefly"
	addFirefly();
        this.redraw= this.redraw.bind(this);
        setTimeout(this.redraw, 0);
    },

    redraw() {
        const unnecessaryMsg= this.usingLabExt ?
            `You have installed the jupyter firefly extension, you don't need to use the ServerConnection Widget<br>` : '' ;
        const warning= this.showURLMismatch ?
            `Preset url either defined in <code>~/.jupyter/jupyter_notebook_config</code> 
             or environment variable <code>FIREFLY_URL</code> conflicts with passed URL, 
             using preset url<br>` : '';
        const connectMsg= `connected url: ${this.connectedURL}`;

        this.el.innerHTML=`<div style='font-size: 10pt'>${unnecessaryMsg}${warning}${connectMsg}</div>`;
    }

});
