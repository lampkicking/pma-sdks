(function() {
    var bidPair = location.search.replace('?','').split('&').filter(pair => pair.indexOf('bid') === 0);
    if (bidPair && bidPair[0]) bid = bidPair[0].split('=')[1];

    var cameraBtn = document.getElementById('prove-my-age-camera-btn');
    var yotiBtn = document.getElementById('prove-my-age-yoti-btn');
    
    var pma = new PMA('<INSERT YOUR BRAND ID HERE>', null);
    
    function init() {
        window.document.onkeyup = e => (e.key === 'Escape') ? pma.hide() : null;
        cameraBtn.onclick = () => pma.cameraView();
        yotiBtn.onclick = () => pma.yotiView();
    }

    function updateSession(signed_redirect) {
        // update session
        alert('age verified');
    }


    pma.listen((err, signed_redirect) => {
        if(err) return init();
        updateSession(signed_redirect);
        pma.hide();
    });
 })();