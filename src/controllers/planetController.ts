import { Request, Response } from 'express';
import { pool } from '../config/database';
import { Planet, PlanetWithMoons } from '../models/Planet';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class PlanetController {
  // Mendapatkan semua planet
  static async getAllPlanets(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM planets ORDER BY distance_from_sun ASC'
      );

      res.json({
        success: true,
        message: 'Data planet berhasil diambil',
        data: rows
      });
    } catch (error) {
      console.error('Error getting planets:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data planet',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Mendapatkan planet berdasarkan ID beserta bulan-bulannya
  static async getPlanetById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Ambil data planet
      const [planetRows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM planets WHERE id = ?',
        [id]
      );

      if (planetRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Planet tidak ditemukan'
        });
      }

      // Ambil data bulan untuk planet ini
      const [moonRows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM moons WHERE planet_id = ? ORDER BY name ASC',
        [id]
      );

      const planetWithMoons: PlanetWithMoons = {
        ...planetRows[0] as Planet,
        moons: moonRows.map(row => ({
          planet_id: row.planet_id,
          name: row.name,
          diameter: row.diameter
        }))
      };

      res.json({
        success: true,
        message: 'Data planet berhasil diambil',
        data: planetWithMoons
      });
    } catch (error) {
      console.error('Error getting planet by ID:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data planet',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Menambah planet baru
  static async createPlanet(req: Request, res: Response) {
    try {
      const { name, diameter, distance_from_sun, has_rings }: Planet = req.body;

      // Cek apakah nama planet sudah ada
      const [existingPlanet] = await pool.execute<RowDataPacket[]>(
        'SELECT id FROM planets WHERE name = ?',
        [name]
      );

      if (existingPlanet.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Planet dengan nama tersebut sudah ada'
        });
      }

      const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO planets (name, diameter, distance_from_sun, has_rings) VALUES (?, ?, ?, ?)',
        [name, diameter, distance_from_sun, has_rings]
      );

      // Ambil data planet yang baru dibuat
      const [newPlanet] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM planets WHERE id = ?',
        [result.insertId]
      );

      res.status(201).json({
        success: true,
        message: 'Planet berhasil ditambahkan',
        data: newPlanet[0]
      });
    } catch (error) {
      console.error('Error creating planet:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal menambahkan planet',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update planet
  static async updatePlanet(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, diameter, distance_from_sun, has_rings }: Planet = req.body;

      // Cek apakah planet exists
      const [existingPlanet] = await pool.execute<RowDataPacket[]>(
        'SELECT id FROM planets WHERE id = ?',
        [id]
      );

      if (existingPlanet.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Planet tidak ditemukan'
        });
      }

      // Cek apakah nama planet sudah digunakan oleh planet lain
      const [duplicateName] = await pool.execute<RowDataPacket[]>(
        'SELECT id FROM planets WHERE name = ? AND id != ?',
        [name, id]
      );

      if (duplicateName.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Planet dengan nama tersebut sudah ada'
        });
      }

      await pool.execute(
        'UPDATE planets SET name = ?, diameter = ?, distance_from_sun = ?, has_rings = ? WHERE id = ?',
        [name, diameter, distance_from_sun, has_rings, id]
      );

      // Ambil data planet yang sudah diupdate
      const [updatedPlanet] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM planets WHERE id = ?',
        [id]
      );

      res.json({
        success: true,
        message: 'Planet berhasil diperbarui',
        data: updatedPlanet[0]
      });
    } catch (error) {
      console.error('Error updating planet:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal memperbarui planet',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Hapus planet
  static async deletePlanet(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Cek apakah planet exists
      const [existingPlanet] = await pool.execute<RowDataPacket[]>(
        'SELECT id, name FROM planets WHERE id = ?',
        [id]
      );

      if (existingPlanet.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Planet tidak ditemukan'
        });
      }

      // Hapus planet (moons akan terhapus otomatis karena CASCADE)
      await pool.execute('DELETE FROM planets WHERE id = ?', [id]);

      res.json({
        success: true,
        message: `Planet ${existingPlanet[0].name} berhasil dihapus`
      });
    } catch (error) {
      console.error('Error deleting planet:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal menghapus planet',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}