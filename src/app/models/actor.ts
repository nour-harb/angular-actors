import { Film } from './film'; 

export class Actor {
  adult: boolean;
  gender: number; 
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: Film[]; 
  
  constructor(data: any) {
    this.adult = data.adult;
    this.gender = data.gender;
    this.id = data.id;
    this.known_for_department = data.known_for_department;
    this.name = data.name;
    this.original_name = data.original_name;
    this.popularity = data.popularity;
    this.profile_path = data.profile_path;
    this.known_for = data.known_for.map((filmData: any) => new Film(filmData));
  }
}
