import { Context } from "../deps.ts";
import { Planet } from "../models/planet.ts";
import client from "../config/db.ts";

export const getAllPlanets = async (ctx: Context) => {
  try {
    const result = await client.query("SELECT * FROM planets");
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

export const getPlanet = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const result = await client.query("SELECT * FROM planets WHERE id = ?", [id]);
    if (result.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Planet not found",
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

export const createPlanet = async (ctx: Context) => {
  try {
    const body = await ctx.request.body().value;
    const planet: Planet = body as Planet;
    const result = await client.query(
      "INSERT INTO planets (name, diameter, distance_from_sun, has_rings) VALUES (?, ?, ?, ?)",
      [planet.name, planet.diameter, planet.distance_from_sun, planet.has_rings]
    );
    ctx.response.status = 201;
    ctx.response.body = {
      success: true,
      message: "Planet created",
      data: { id: result.lastInsertId, ...planet },
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};

export const updatePlanet = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const body = await ctx.request.body().value;
    const planet: Planet = body as Planet;
    const result = await client.query(
      "UPDATE planets SET name = ?, diameter = ?, distance_from_sun = ?, has_rings = ? WHERE id = ?",
      [planet.name, planet.diameter, planet.distance_from_sun, planet.has_rings, id]
    );
    if (result.affectedRows === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Planet not found",
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      message: "Planet updated",
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};

export const deletePlanet = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const result = await client.query("DELETE FROM planets WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Planet not found",
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      message: "Planet deleted",
    };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };
  }
};