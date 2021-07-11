
export interface Local {
    Nombre: string;
    Descripcion: string;
    Direccion: string;
    openHours: string;
    OpenDays: string;
    imagen: string;
    ubicacion:{
        lat:number;
        lng:number;
    };
    likes: string [];
    id: string;
    fechaCreacion: Date;
}

export interface User {
    uid: string;
    displayName: string;
    photoURL: any;
    email: string;
}

export interface Sugerencia {
    Nombre: string;
    Descripcion: string;
    Direccion: string;
    openHours: string;
    OpenDays: string;
    id: string;
    ubicacion:{
        lat:number;
        lng:number;
    };
    likes: string [];
    fechaCreacion: Date;
}

export interface Comentario {
    autor: string;
    foto:string;
    comentario: string;
    fecha: any;
    id: string;

}
