import { Context } from "../deps.ts";
import { Moon } from "../models/moon.ts";
import client from "../config/db.ts";

export const getAllMoons = async (ctx: Context) => {
  try {
    const result = await client.query("SELECT * FROM moons");
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: result,
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};

export const getMoon = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const result = await client.query("SELECT * FROM moons WHERE id = ?", [id]);
    if (result.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Moon not found",
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: result[0],
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};

export const createMoon = async (ctx: Context) => {
  try {
    const body = await ctx.request.body().value;
    const moon: Moon = body as Moon;
    const result = await client.query(
      "INSERT INTO moons (planet_id, name, diameter, discovered_year) VALUES (?, ?, ?, ?)",
      [moon.planet_id, moon.name, moon.diameter, moon.discovered_year]
    );
    ctx.response.status = 201;
    ctx.response.body = {
      success: true,
      message: "Moon created",
      data: { id: result.lastInsertId, ...moon },
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};

export const updateMoon = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const body = await ctx.request.body().value;
    const moon: Moon = body as Moon;
    const result = await client.query(
      "UPDATE moons SET planet_id = ?, name = ?, diameter = ?, discovered_year = ? WHERE id = ?",
      [moon.planet_id, moon.name, moon.diameter, moon.discovered_year, id]
    );
    if (result.affectedRows === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Moon not found",
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      message: "Moon updated",
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};

export const deleteMoon = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const result = await client.query("DELETE FROM moons WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Moon not found",
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      message: "Moon deleted",
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};