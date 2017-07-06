import crypto from 'crypto';
import agent from './db/agent';

export async function login(creds) {
    creds.password = encrypt(creds.password);
    const logins = await getLogins();
    const filtered = logins.filter((login) => login.username === creds.username && login.password === creds.password);
    if (filtered.length !== 1) return Promise.resolve(false);
    return Promise.resolve(true);
}

function getLogins() {
    return new Promise((resolve, reject) => {
        const writer = agent();
        return writer.readFile(process.env.CREDSFILE, 'utf-8', handleRead);

        function handleRead(err, data) {
            if (err) reject(err);
            const parsed = JSON.parse(data);
            resolve(parsed);
        }
    });
}

export function encrypt(text) {
    const alg = process.env.CRYPTO_ALGORITHM || 'aes-256-ctr';
    const cipher = crypto.createCipher(alg, process.env.SECRET);
    let crypted = cipher.update(text, 'hutf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// function decrypt(text) {
//     const alg = process.env.CRYPTO_ALGORITHM || 'aes-256-ctr';
//     const decipher = crypto.createDecipher(alg, process.env.SECRET);
//     let dec = decipher.update(text, 'hex', 'utf8');
//     dec += decipher.final('utf8');
//     return dec;
// }
