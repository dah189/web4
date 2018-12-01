var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var product = require('./product');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
var router = express.Router();


// all other code will go here 
mongoose.connect('mongodb://localhost:27017/products');

router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request will be done here');
    next(); // make sure we go to the next routes and don't stop here
});

app.use(express.static(__dirname + '/api/products'));

app.get('/', function(req, res, next) {
    res.sendfile('./api/products/index.html');
});

router.route('/products').post(function (req, res) {
	var p = new product();
	    p.title = req.body.title;
	    p.price = req.body.price;
	    p.author = req.body.author;
	    p.publisher = req.body.publisher;
	    p.save(function (err) {
	        if (err) {
	            res.send(err);
	        }
	        res.send({ message: 'Product Created !' });
	    });
	   
});

router.route('/products').get(function (req, res) {
    product.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.json(products);
    });
});

router.route('/products/:product_id').get(function (req, res) {

    product.findById(req.params.product_id, function (err, prod) {
        if (err)
            res.send(err);
        res.json(prod);
    });
});

router.route('/products/:product_id').put(function (req, res) {

    product.findById(req.params.product_id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        prod.title = req.body.title;
        prod.price = req.body.price;
        prod.author = req.body.author;
        prod.publisher = req.body.publisher;
        prod.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product updated!' });
        });

    });
});

router.route('/products/:product_id').delete(function (req, res) {

    product.findByIdAndRemove(req.params.product_id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });

});

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is runnning at ' + port);