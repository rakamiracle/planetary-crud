import { Request, Response } from 'express';
import { pool } from '../config/database';
import { Moon } from '../models/Moon';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class MoonController {
  // Mendapatkan semua bulan
  static async getAllMoons(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT m.*, p.name as planet_name 
         FROM moons m 
         JOIN planets p ON m.planet_id = p.id 
         ORDER BY p.name, m.name`
      );

      res.json({
        success: true,
        message: 'Data bulan berhasil diambil',
        data: rows
      });
    } catch (error) {
      console.error('Error getting moons:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data bulan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Mendapatkan bulan berdasarkan planet ID
  static async getMoonsByPlanetId(req: Request, res: Response) {
    try {
      const { planetId } = req.params;

      // Cek apakah planet exists
      const [planetCheck] = await pool.execute<RowDataPacket[]>(
        'SELECT name FROM planets WHERE id = ?',
        [planetId]
      );

      if (planetCheck.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Planet tidak ditemukan'
        });
      }

      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM moons WHERE planet_id = ? ORDER BY name',
        [planetId]
      );

      res.json({
        success: true,
        message: `Data bulan planet ${planetCheck[0].name} berhasil diambil`,
        data: rows
      });
    } catch (error) {
      console.error('Error getting moons by planet ID:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data bulan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Mendapatkan bulan berdasarkan ID
  static async getMoonById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT m.*, p.name as planet_name 
         FROM moons m 
         JOIN planets p ON m.planet_id = p.id 
         WHERE m.id = ?`,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bulan tidak ditemukan'
        });
      }

      res.json({
        success: true,
        message: 'Data bulan berhasil diambil',
        data: rows[0]
      });
    } catch (error) {
      console.error('Error getting moon by ID:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data bulan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Menambah bulan baru
  static async createMoon(req: Request, res: Response) {
    try {
      const { planet_id, name, diameter, discovered_year }: Moon = req.body;

      // Cek apakah planet exists
      const [planetCheck] = await pool.execute<RowDataPacket[]>(
        'SELECT name FROM planets WHERE id = ?',
        [planet_id]
      );

      if (planetCheck.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Planet tidak ditemukan'
        });
      }

      // Cek apakah nama bulan sudah ada untuk planet yang sama
      const [existingMoon] = await pool.execute<RowDataPacket[]>(
        'SELECT id FROM moons WHERE name = ? AND planet_id = ?',
        [name, planet_id]
      );

      if (existingMoon.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Bulan dengan nama tersebut sudah ada di planet ini'
        });
      }

      const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO moons (planet_id, name, diameter, discovered_year) VALUES (?, ?, ?, ?)',
        [planet_id, name, diameter, discovered_year || null]
      );

      // Ambil data bulan yang baru dibuat
      const [newMoon] = await pool.execute<RowDataPacket[]>(
        `SELECT m.*, p.name as planet_name 
         FROM moons m 
         JOIN planets p ON m.planet_id = p.id 
         WHERE m.id = ?`,
        [result.insertId]
      );

      res.status(201).json({
        success: true,
        message: 'Bulan berhasil ditambahkan',
        data: newMoon[0]
      });
    } catch (error) {
      console.error('Error creating moon:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal menambahkan bulan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update bulan
  static async updateMoon(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { planet_id, name, diameter, discovered_year }: Moon = req.body;

      // Cek apakah bulan exists
      const [existingMoon] = await pool.execute<RowDataPacket[]>(
        'SELECT id FROM moons WHERE id = ?',
        [id]
      );

      if (existingMoon.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bulan tidak ditemukan'
        });
      }

      // Cek apakah planet exists
      const [planetCheck] = await pool.execute<RowDataPacket[]>(
        'SELECT name FROM planets WHERE id = ?',
        [planet_id]
      );

      if (planetCheck.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Planet tidak ditemukan'
        });
      }

      // Cek apakah nama bulan sudah digunakan oleh bulan lain di planet yang sama
      const [duplicateName] = await pool.execute<RowDataPacket[]>(
        'SELECT id FROM moons WHERE name = ? AND planet_id = ? AND id != ?',
        [name, planet_id, id]
      );

      if (duplicateName.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Bulan dengan nama tersebut sudah ada di planet ini'
        });
      }

      await pool.execute(
        'UPDATE moons SET planet_id = ?, name = ?, diameter = ?, discovered_year = ? WHERE id = ?',
        [planet_id, name, diameter, discovered_year || null, id]
      );

      // Ambil data bulan yang sudah diupdate
      const [updatedMoon] = await pool.execute<RowDataPacket[]>(
        `SELECT m.*, p.name as planet_name 
         FROM moons m 
         JOIN planets p ON m.planet_id = p.id 
         WHERE m.id = ?`,
        [id]
      );

      res.json({
        success: true,
        message: 'Bulan berhasil diperbarui',
        data: updatedMoon[0]
      });
    } catch (error) {
      console.error('Error updating moon:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal memperbarui bulan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Hapus bulan
  static async deleteMoon(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Cek apakah bulan exists
      const [existingMoon] = await pool.execute<RowDataPacket[]>(
        'SELECT name FROM moons WHERE id = ?',
        [id]
      );

      if (existingMoon.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bulan tidak ditemukan'
        });
      }

      await pool.execute('DELETE FROM moons WHERE id = ?', [id]);

      res.json({
        success: true,
        message: `Bulan ${existingMoon[0].name} berhasil dihapus`
      });
    } catch (error) {
      console.error('Error deleting moon:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal menghapus bulan',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}