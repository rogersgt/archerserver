import crypto from 'crypto';

export default function (req, res, next) {
    // console.log(req.originalUrl);
    switch(req.originalUrl) {
        case '/api/login':
            next();
        break;
        case '/api/logout':
            next();
        break;
        default:
            const data = JSON.parse(decrypt(req.cookies['archeravenue']));
            const time = new Date(data.timestamp);
            const now = new Date();
            const timeDiff = now.getDate() - time.getDate();
            if (!time || time > now || timeDiff > 120000000) {
                res.status(403).send({ Message: 'Please log in first' });
            } else {
                next();
            }
        break;
    }
}

function decrypt(text) {
    const alg = process.env.CRYPTO_ALGORITHM || 'aes-256-ctr';
    const decipher = crypto.createDecipher(alg, process.env.SECRET);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
