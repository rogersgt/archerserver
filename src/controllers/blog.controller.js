import * as blogService from '../services/blog.service';

export function writeBlog(req, res) {
    return Promise.resolve()
    .then(blogService.updateBlogs(req.body))
    .then(res.status(200).send({ success: true }))
    .catch((err) => res.status(500).send(err));
}

export function getBlogs(req, res) {
    return Promise.resolve()
    .then(blogService.getBlogs())
    .then((blogs) => res.status(200).send(blogs))
    .catch((err) => res.status(500).send(err));
}
