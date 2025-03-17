export const signup = async (req, res) => {
    try {

        res.send("Signup successful");
        
    } catch (error) {

      res.status(500).send("Internal server error");
    }
  };
  
  
  