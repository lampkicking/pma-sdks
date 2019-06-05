class PMA {
  /**
   * @param {object} configuration - An object
   * @param {string} configuration.brandId - An string with the client brand id
   * @param {string} configuration.redirectTo - url client app, it will be used to redirect at the end of the flow
   * @param {string} configuration._domain - change iframe and location domain only for testing purposes
   */
  constructor({ brandId, redirectTo = window.location, _domain = process.env.DOMAIN }) {
    this._hooks = {
      hiddenBackgroundIframe: null
    };

    this._host = "https://" + _domain;
    this._backgroundUrl = `/token/background/?bid=${brandId}&redirect_to=${redirectTo}`;
    this._selectionFlowAgeVerificationUrl = `/?bid=${brandId}&redirect_to=${redirectTo}`;
  }

  _handleIframeMessage(event) {
    if (event.origin !== this._host) {
      return;
    }

    let data = JSON.parse(event.data);

    if (!data.status) {
      return;
    }

    return data
  }

  _createHiddenIframe() {
      let iframe = document.createElement('iframe');

      iframe.setAttribute('width', 0);
      iframe.setAttribute('height', 0);
      iframe.setAttribute('src', this._host + this._backgroundUrl);
      iframe.style.display = 'none';

      return iframe;
  }

  _appendHiddenBackgroundIframe() {
    this._hooks.hiddenBackgroundIframe = this._createHiddenIframe();

    document.body.appendChild(this._hooks.hiddenBackgroundIframe);
  }

  _deleteHiddenBackgroundIframe() {
    this._hooks.hiddenBackgroundIframe.remove();
  }

  checkIsAgeVerified() {
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (event) => { // had some problem with bind. I wanted have a pointer so I can later delete the listener
        let iframeResponse = this._handleIframeMessage(event)
        
        if (!iframeResponse) {
          return;
        }
        
        if (iframeResponse.status == 200) {
          resolve(status, iframeResponse.message);
        } else {
          reject(status, iframeResponse.error);
        }
    
        this._deleteHiddenBackgroundIframe();
      });

      if (this._hooks.hiddenBackgroundIframe) {
        this._deleteHiddenBackgroundIframe();
      }

      this._appendHiddenBackgroundIframe();
    });
  };

  optionsView() {
    window.location = this._host + this._selectionFlowAgeVerificationUrl;
  };

  // destroy() { // bind did not work
  //   window.removeEventListener('message', this._handleAgeVerifyMessage);
  // }
}

// export default bundle the module like this { default: func }, not suitable for global variable
// export default PMA;
module.exports = PMA;
