const Job = require('../models/Job')
const {StatusCodes} =  require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../error')

const getAllJobs = async(req, res)=>{
    try {
        const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
        res.status(StatusCodes.OK).json({jobs, count:jobs.length})
    } catch (error) {
        console.log(error);
    }
    
}

const getJob = async(req, res)=>{
    res.send('get job')
}

const createJob = async(req, res)=>{
   try {
    req.body.createdBy = req.user.userId
    const job = await Job.create({...req.body})
    res.status(StatusCodes.CREATED).json({job})
   } catch (error) {
    console.log(error);
   }
   
}

const updateJob = async(req, res)=>{
    res.send('update job')
}

const deleteJob = async(req, res)=>{
    res.send('delete job')
}

module.exports = {
    getAllJobs , 
    getJob, 
    createJob, 
    updateJob, 
    deleteJob
}