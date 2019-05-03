function PMA(brandId, redirect_to, sandbox) {
    var domain = 'www.provemyage.com';
    if(sandbox) domain = domain.replace('www', sandbox);

    var backgroundUrl = '/token/background/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location);
    var cameraUrl = '/token/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location) + '&type=camera';
    var embedUrl = '/embed/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location);
    var yotiUrl = '/token/?bid=' + brandId + '&redirect_to=' + (redirect_to || window.location) + '&type=yoti';
    var iframeCount = 0;
    var overlay = null;

    function createIframe(src, allow, width, height) {
        var iframe = document.createElement('iframe');
        allow && iframe.setAttribute('allow', allow);
        iframe.setAttribute('width', width || 1024);
        iframe.setAttribute('height', height || 768);
        iframe.setAttribute('src', 'https://' + domain + src);
        iframe.setAttribute('allowtransparency', false);
        iframe.id = 'pmaIframe' + iframeCount;
        iframeCount++;
        if(width === 0 || height === 0) iframe.style.display = 'none';
        return iframe;
    }

    function getOverlay() {
        if(!overlay) document.body.removeChild(overlay);
        overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0px';
        overlay.style.bottom = '0px';
        overlay.style.left = '0px';
        overlay.style.right = '0px';
        overlay.style.opacity = '0.9';
        overlay.style.backgroundColor = 'black';
        overlay.id = 'pma-overlay';
        document.body.appendChild(overlay);
        return overlay

    }

    this.listen = function(callback) {
        window.addEventListener('message', function(msg){
            if(msg.origin !== window.location.origin) {
                var data = JSON.parse(msg.data);
                data.status && callback( data.status == 200 ? null : data.status, data.message)
            }    
        });
        document.body.appendChild(createIframe(backgroundUrl, 0, 0));
    };

    this.close = function() {
        var el = getOverlay()
        
        el.childNodes.map(function(node) {
            el.removeChild(node);
        });

        el.style.display = 'none';
    }

    this.show = function() {
        var el = getOverlay();
        el.style.display = 'none';
    }

    this.optionsView = function(width, height) {
        this.close();
        getOverlay().appendChild(createIframe(embedUrl, 'camera;', width, height));
        this.show();
    };

    this.cameraView = function(width, height) {
        this.close();
        getOverlay().appendChild(createIframe(cameraUrl, 'camera;', width, height));
        this.show();
    };

    this.yotiView = function(width, height) {
        this.close();
        getOverlay().appendChild(createIframe(yotiUrl, null, width, height));
        this.show();
    };
};