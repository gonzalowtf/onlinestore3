module.exports = function(app) {
 
  var Tshirt = require('../models/tshirt.js');
  var controller = require ('../controllers');
  var modeloimagen = require ('../server.js');
 
  //GET - Return all tshirts in the DB
  findAllTshirts = function(req, res) {
    console.log("GET - /tshirts");
      return Tshirt.find(function(err, tshirts) {
          if(!err) {
              return res.send(tshirts);
          } else {
        res.statusCode = 500;
              console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
          }
      });
  };
 
  //GET - Return a Tshirt with specified ID
  findById = function(req, res) {
    console.log("GET - /tshirt/:id");
    return Tshirt.findById(req.params.id, function(err, tshirt) {
      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, tshirt { tshirt values }}
        return res.send({ status: 'OK', tshirt:tshirt });
        // Send {tshirt values}
        // return res.send(tshirt);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };
 
  //POST - Insert a new Tshirt in the DB
  addTshirt = function(req, res) {
    console.log('POST - /tshirt');
    console.log(req.body);
 
    var tshirt = new Tshirt({
      model:    req.body.model,
      images :  req.body.images, 
      style:    req.body.style,
      size :    req.body.size, 
      colour:   req.body.colour, 
      price:    req.body.price,
      summary:  req.body.summary,
      name: req.body.name  
    });
 
    tshirt.save(function(err) {
      if(!err) {
        console.log("Tshirt created");
        return res.send({ status: 'OK', tshirt:tshirt });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
 
    res.send(tshirt);
  };
 
  //PUT - Update a register already exists
  updateTshirt = function(req, res) {
    console.log("PUT - /tshirt/:id");
    console.log(req.body);
    return Tshirt.findById(req.params.id, function(err, tshirt) {
      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      if (req.body.model != null) tshirt.model = req.body.model;
      if (req.body.price != null) tshirt.price = req.body.price;
      if (req.body.images != null) tshirt.images = req.body.images; 
      if (req.body.style != null) tshirt.style = req.body.style;
      if (req.body.size != null) tshirt.size  = req.body.size;
      if (req.body.colour != null) tshirt.colour = req.body.colour;
      if (req.body.summary != null) tshirt.summary = req.body.summary;
      if (req.body.name != null) tshirt.name = req.body.name;

 
      return tshirt.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', tshirt:tshirt });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
 
        res.send(tshirt);
      });
    });
  }
 
  //DELETE - Delete a Tshirt with specified ID
  deleteTshirt = function(req, res) {
    console.log("DELETE - /tshirt/:id");
    return Tshirt.findById(req.params.id, function(err, tshirt) {
      if(!tshirt) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      return tshirt.remove(function(err) {
        if(!err) {
          console.log('Removed tshirt');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }
 
  //Link routes and functions
  app.get('/tshirts', findAllTshirts);
  app.get('/tshirts', controller.getTshirt);
  app.get('/tshirt/:id', findById);
  app.post('/tshirt', addTshirt);
  app.put('/tshirt/:id', updateTshirt);
  app.delete('/tshirt/:id', deleteTshirt);
 



// -------------------------------------------------------------------------------

findAllImagenes = function(req, res) {
    console.log("GET - /imagenes");
      return modeloimagen.find(function(err, tshirts) {
          if(!err) {
              return res.send(imagenes);
          } else {
        res.statusCode = 500;
              console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
          }
      });
  };
 
  //GET - Return a Tshirt with specified ID
  findById = function(req, res) {
    console.log("GET - /imagenes/:id");
    return modeloimagen.findById(req.params.id, function(err, modeloimagen) {
      if(!modeloimagen) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, tshirt { tshirt values }}
        return res.send({ status: 'OK', modeloimagen:modeloimagen });
        // Send {tshirt values}
        // return res.send(tshirt);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };
 
  //POST - Insert a new Tshirt in the DB
  addImagen = function(req, res) {
    console.log('POST - /imagenes');
    console.log(req.body);
 
    var img = new modeloimagen({
      titulo  :  req.body.titulo,
      images :  req.body.imagen 
      
    });
 
    img.save(function(err) {
      if(!err) {
        console.log("Image created");
        return res.send({ status: 'OK', modeloimagen:modeloimagen });
      } else {
        console.log(err);
        if(err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({ error: 'Validation error' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Server error' });
        }
        console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
 
    res.send(modeloimagen);
  };
 
  //PUT - Update a register already exists
  updateImagen = function(req, res) {
    console.log("PUT - /modeloimagen/:id");
    console.log(req.body);
    return modeloimagen.findById(req.params.id, function(err, modeloimagen) {
      if(!modeloimagen) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      if (req.body.titulo != null) modeloimagen.titulo = req.body.titulo;
      if (req.body.imagen!= null) modeloimagen.imagen = req.body.imagen;
      
      return modeloimagen.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', modeloimagen: modeloimagen });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
 
        res.send(modeloimagen);
      });
    });
  }
 
  //DELETE - Delete a Tshirt with specified ID
  deleteTshirt = function(req, res) {
    console.log("DELETE - /modeloimagen/:id");
    return modeloimagen.findById(req.params.id, function(err, modeloimagen) {
      if(!modeloimagen) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
 
      return modeloimagen.remove(function(err) {
        if(!err) {
          console.log('Removed Image');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }
 
  //Link routes and functions
  app.get('/imagenes', findAllTshirts);
  app.get('/imagenes', controller.getTshirt);
  app.get('/imagenes/:id', findById);
  app.post('/imagenes', addTshirt);
  app.put('/imagenes/:id', updateTshirt);
  app.delete('/imagenes/:id', deleteTshirt);
 
}


