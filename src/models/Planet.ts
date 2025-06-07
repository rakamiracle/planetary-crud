export interface Planet {
  id?: number;
  name: string;
  diameter: number;
  distance_from_sun: number;
  has_rings: boolean;
  created_at?: Date;
}

export interface PlanetWithMoons extends Planet {
  moons?: Moon[];
}

export interface Moon {
  id?: number;
  planet_id: number;
  name: string;
  diameter: number;
  discovered_year?: number;
  created_at?: Date;
}