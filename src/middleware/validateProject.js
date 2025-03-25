const validateProject = (req, res, next) => {
    console.log("Middleware executed");
    const {name, description, dueData} = req.body;

    if(!name || !description || dueData){
        return res.status(400).json({message: "Every field is compulsory"})
    }
    next()
}

export default validateProject;