const express = require('express');

const newspressRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const newspressController = require('../controllers/newspress-controller');


// newspressRoute.post('/', newspressController.create);
newspressRoutes.post('/', newspressController.create);//B
newspressRoutes.post('/userSources', newspressController.show);
newspressRoutes.post('/saveArticle', newspressController.saveArticle);
newspressRoutes.post('/userSavedArticles', newspressController.getUserSavedArticles);
newspressRoutes.post('/deleteSource', newspressController.destroySource);
newspressRoutes.post('/deleteArticle', newspressController.destroyArticle);



newspressRoutes.post('/topic', newspressController.createTopic);
newspressRoutes.get('/topic/:title', newspressController.showTopic);
// newspressroutes.get('/:id', newspressController.show);
// newspressroutes.put('/:id', newspressController.update);
// newspressroutes.delete('/:id', newspressController.destroy);


// newspressRoutes.get('/add', authHelpers.loginRequired, (req, res) => {
//   res.render('newspress/newspress-add', {
//     currentPage: 'add',
//   });
// });

// newspressRoutes.get('/:id/edit', authHelpers.loginRequired, newspressController.edit);
// newspressRoutes.get('/:id', newspressController.show);
// newspressRoutes.put('/:id', authHelpers.loginRequired, newspressController.update);
// newspressRoutes.delete('/:id', authHelpers.loginRequired, newspressController.delete);



module.exports = newspressRoutes;
