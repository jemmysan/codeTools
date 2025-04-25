
// const validate = (schema) => (req, res, next) => {
    //     const { error } = schema.validate(req.body);
    //     if (error) return res.status(400).json({ message: error.details[0].message });
    //     next();
    //   };
    
    
export const validate = (schema) => (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(err => err.message);
        return res.status(400).json({ message: messages.join(', ') });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Erreur de validation', details: err.message });
    }
  };
