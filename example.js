const crypto = require('crypto');

function validate(req, res, next) {
        const [, params] = url.split('?')
        const keys = {};

        params.split('&').forEach((param) => {
            const [key, val] = param.split('=');
            keys[key] = val;
        });

        const signature = keys['signature'];

        if (!signature) return false;

        delete keys['signature'];
    
        const message = Object.keys(keys).sort().map((key) => key === 'signature' ? '' : `${key}=${keys[key]}`)
            .filter(item => item.indexOf('undefined') === -1)
            .join('&');
        
        req.session.ageVerified = crypto.createHmac('sha256', this.secret).update(message).digest('hex') == signature;
        next();
    }
