const sendError = require('../middlewares/errorsDetector');

module.exports = (title, posts) => {

    const baseSlug = title.replaceAll(' ', '-').replaceAll('/', '-').toLowerCase()

    if (!baseSlug) {
        const err = new Error('Il titolo non è corretto o non contiene un numero minimo di caratteri');
        err.status = 401;
        return sendError(err);
    }

    const slugs = posts.map(post => post.slug);

    let counter = 1;
    let slug = baseSlug;

    while (slugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++
    }

    return slug
}