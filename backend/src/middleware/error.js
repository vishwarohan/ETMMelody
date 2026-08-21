export const notFound=(req,res)=>res.status(404).json({message:'Route not found'});
export const errorHandler=(err,req,res,next)=>res.status(res.statusCode===200?500:res.statusCode).json({message:err.message||'Something went wrong'});
