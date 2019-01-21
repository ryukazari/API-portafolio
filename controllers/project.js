var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller ={

    home: function(req,res){
        return res.status(200).send({
            message: 'Home'            
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message: 'Test'
        });
    },

    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;
        project.name=params.name;
        project.description=params.description;
        project.category=params.category;
        project.year=params.year;
        project.langs=params.langs;
        project.image="a8Uw3nDw5U8uDe5SCXimqSPN.png";

        project.save(function(err,projectStored){
            if(err) return res.status(500).send({message: 'error al guardar'});
            if(!projectStored) return res.status(404).send({message: 'No se pudo guardar el proyecto'});
            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function(req, res){
        var projectId = req.params.id;
        if(projectId==null) return res.status(404).send({message: 'el projecto no existe'});

        Project.findById(projectId,function(err,project){
            if(err) return res.status(500).send({message: 'error al devolver los datos'});
            if(!project) return res.status(404).send({message: 'el projecto no existe'});
            return res.status(200).send({project});
        });
    },

    getProjects: function(req, res){
        Project.find({}).exec(function(err,projects){
            if(err) return res.status(500).send({message: 'error al devolver los datos'});
            if(!projects) return res.status(404).send({message: 'No hay projectos :,c'});
            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new : true}, function(err, projectUpdate){
            if(err) return res.status(500).send({message: 'error al devolver los datos'});
            if(!projectUpdate) return res.status(404).send({message: 'no se ha podido acutalizar el projecto o no existe'});
            return res.status(200).send({project: projectUpdate})
        });
    },

    deleteProject: function(req, res){
        var projectId = req.params.id;
        
        Project.findByIdAndRemove(projectId, function(err, projectRemoved){
            if(err) return res.status(500).send({message:'error al eliminar el proyecto'});
            if(!projectRemoved) return res.status(404).send({message: 'No se pudo'});
            return res.status(200).send({project: projectRemoved});
        });
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'a8Uw3nDw5U8uDe5SCXimqSPN.png';

        if(req.files){
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            let extensionSplit = fileName.split('.');
            let fileExtension = extensionSplit[1];
            
            if(fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg' || fileExtension == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, function(err, projectUpdate){
                    if(err) return res.status(500).send({message: 'la imagen no se subió'});
                    if(!projectUpdate) return res.status(404).send({message:'NOOOOOOOO'});
                    return res.status(200).send({project: projectUpdate});
                 });
            }else{
                fs.unlink(filePath, function(err){
                    return res.status(200).send({message: 'la extension no es valida'})
                });
            }            
        }else{
            
            //return res.status(200).send({message: fileName});
            if(fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg' || fileExtension == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, function(err, projectUpdate){
                    if(err) return res.status(500).send({message: 'la imagen no se subió'});
                    if(!projectUpdate) return res.status(404).send({message:'NOOOOOOOO'});
                    return res.status(200).send({project: projectUpdate});
                 });
            }else{
                fs.unlink(filePath, function(err){
                    return res.status(200).send({message: 'la extension no es valida'})
                });
            }   
        }


    },

    getImage: (req,res)=>{
        let image = req.params.image;
        let pathFile = './uploads/'+image;
        fs.exists(pathFile, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(pathFile))
            }else{
                return res.status(200).send({message: 'no existe la imagen'});
            }
        });
    }


}

module.exports = controller;