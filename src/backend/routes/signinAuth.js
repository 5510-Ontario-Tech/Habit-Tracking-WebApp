router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, user });
    } catch (error) {
      console.error('Error signing in user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });