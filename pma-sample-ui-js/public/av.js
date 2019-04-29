(function() {
    var bidPair = location.search.replace('?','').split('&').filter(pair => pair.indexOf('bid') === 0);
    if (bidPair && bidPair[0]) bid = bidPair[0].split('=')[1];

    window.document.onkeyup = function(e) {
        if(e.key === 'Escape') {
            closeLightBox();
        }
    }
    
    
    var pma = new PMA(bid, null, 'stg0.www');


    function init() {
        console.log('no token');
        document.getElementById('prove-my-age-btn').onclick = function() {
            document.getElementById('overlay').className = document.getElementById('overlay').className.replace('hide','show');
            pma.optionsView(document.getElementById('age-verification'), '90%', '680px');
        }

        document.getElementById('prove-my-age-camera-btn').onclick = function() {
            document.getElementById('overlay').className = document.getElementById('overlay').className.replace('hide','show');
            pma.cameraView(document.getElementById('age-verification'), '90%', '680px');
        }

        document.getElementById('prove-my-age-yoti-btn').onclick = function() {
            document.getElementById('overlay').className = document.getElementById('overlay').className.replace('hide','show');
            pma.yotiView(document.getElementById('age-verification'), '90%', '680px');
        }
        document.getElementById('prove-my-age-token-btn').onclick = function() {
            pma = new PMA(document.getElementById('bid-txt').value, null, document.getElementById('env').value);
        }
    }

    function done() {
        document.getElementById('age-verification').innerHTML = '';
        document.getElementById('overlay').className = document.getElementById('overlay').className.replace('show','hide');
        alert('age token detected');
    }

    function closeLightBox() {
        document.getElementById('age-verification').innerHTML = '';
        document.getElementById('overlay').className = document.getElementById('overlay').className.replace('show','hide');
    }

    document.getElementById('overlay').onclick = closeLightBox;
    document.getElementById('bid-txt').value = bid;
    document.getElementById('bid-txt').onblur = function() {
        pma = new PMA(document.getElementById('bid-txt').value, null, document.getElementById('env').value);
    }

    pma.listen((err, redirect) => {
        if(err) return init();
        done(redirect);
    });
 })();