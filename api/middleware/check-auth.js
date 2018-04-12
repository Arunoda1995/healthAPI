const jwt = require('jsonwebtoken');



module.exports = (req,res,next) => {

    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.useData = decoded;
        next();

    }
    catch(error)
    {
        return res.status(401).json({

           message:'Authontication Failed'

        });
    }
    
};

/*

    
    01.List of Security Risks:-
            1.Sometimes Passwords can be week 
                        *How it is addressed:-
                                1.Use json web token(JWT) for user authentication. For the users who log in to the system using 
                                  correct credentials will provide a token. That token will be experied after one hour.
           
            
   

*/