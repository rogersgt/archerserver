import * as authService from '../services/auth.service';

export function login(req, res) {
    return Promise.resolve()
    .then(() => authService.login(req.body))
    .then((data) => {
        if (!data) return res.status(403).send('Invalid credentials');
        const obj = {
            user: req.body.username,
            timestamp: new Date()
        };
        const cookie = authService.encrypt(JSON.stringify(obj));
        res.cookie('archeravenue', cookie).send({ Status: 'Ok'});
    })
    .catch((err) => res.status(500).send(err));
}
