const Job = require('../models/Job')
const {StatusCodes} =  require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../error')

const  getAllJobs= async(req, res)=>{
    
        const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
        console.log(jobs)
     
        res.status(StatusCodes.OK).json({jobs, count:jobs.length})
    
}

const getJob = async(req, res)=>{
  
        const {user:{userId}, 
        params:{id:jobId}} = req
        const job = await Job.findOne({_id: jobId, createdBy:userId})
    if(!job){
       throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
   
    
    }


const createJob = async(req, res)=>{
    const {company, position} = req.body
    if(!company || !position){
        throw new BadRequestError('Company and Position are required')
    }
   
    req.body.createdBy = req.user.userId
    const job = await Job.create({...req.body})
    res.status(StatusCodes.CREATED).json({job})


    console.log(error);
}

const updateJob = async(req, res)=>{
    const {
        body:{company, position},
        user:{userId},
        params: {id:jobId}}= req

        if(company==='' || position===''){
            throw new BadRequestError('Company and Position cannot be empty')
        }
     
            const job = await Job.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body,
                {new: true, runValidators:true}
                )   
                if(!job){
                    throw new NotFoundError(`No job with id ${jobId}`)
                }
                res.status(StatusCodes.OK).json({job})
            
                res.status(404).json({message: `No job with id ${jobId}`})
   
}

const deleteJob = async(req, res)=>{
    const {user:{userId},
params:{id:jobId}}= req;
    const job = await Job.findByIdAndDelete({_id: jobId, createdBy: req.user.userId})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send({message:'Job Deleted Successfully!'})

}

module.exports = {
    getAllJobs , 
    getJob, 
    createJob, 
    updateJob, 
    deleteJob
}