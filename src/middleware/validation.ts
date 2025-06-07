import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Schema validasi untuk Planet
export const planetSchema = Joi.object({
  name: Joi.string().min(2).max(100).required()
    .messages({
      'string.min': 'Nama planet minimal 2 karakter',
      'string.max': 'Nama planet maksimal 100 karakter',
      'any.required': 'Nama planet wajib diisi'
    }),
  diameter: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Diameter harus berupa angka',
      'number.integer': 'Diameter harus berupa bilangan bulat',
      'number.min': 'Diameter minimal 1 km',
      'any.required': 'Diameter wajib diisi'
    }),
  distance_from_sun: Joi.number().integer().min(0).required()
    .messages({
      'number.base': 'Jarak dari matahari harus berupa angka',
      'number.integer': 'Jarak dari matahari harus berupa bilangan bulat',
      'number.min': 'Jarak dari matahari tidak boleh negatif',
      'any.required': 'Jarak dari matahari wajib diisi'
    }),
  has_rings: Joi.boolean().required()
    .messages({
      'boolean.base': 'Has rings harus berupa boolean (true/false)',
      'any.required': 'Has rings wajib diisi'
    })
});

// Schema validasi untuk Moon
export const moonSchema = Joi.object({
  planet_id: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Planet ID harus berupa angka',
      'number.integer': 'Planet ID harus berupa bilangan bulat',
      'number.min': 'Planet ID minimal 1',
      'any.required': 'Planet ID wajib diisi'
    }),
  name: Joi.string().min(2).max(100).required()
    .messages({
      'string.min': 'Nama bulan minimal 2 karakter',
      'string.max': 'Nama bulan maksimal 100 karakter',
      'any.required': 'Nama bulan wajib diisi'
    }),
  diameter: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Diameter harus berupa angka',
      'number.integer': 'Diameter harus berupa bilangan bulat',
      'number.min': 'Diameter minimal 1 km',
      'any.required': 'Diameter wajib diisi'
    }),
  discovered_year: Joi.number().integer().min(1500).max(new Date().getFullYear()).optional()
    .messages({
      'number.base': 'Tahun penemuan harus berupa angka',
      'number.integer': 'Tahun penemuan harus berupa bilangan bulat',
      'number.min': 'Tahun penemuan minimal 1500',
      'number.max': `Tahun penemuan maksimal ${new Date().getFullYear()}`
    })
});

// Middleware validasi
export const validatePlanet = (req: Request, res: Response, next: NextFunction) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateMoon = (req: Request, res: Response, next: NextFunction) => {
  const { error } = moonSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};