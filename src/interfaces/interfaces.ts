export interface Usuario {
    nombre?: string,
    apellidos?: string,
    password?: string,
    email?: string,
    tipo?: number,
    telefono?: string,
    nacimiento?:string,
    avatar?: string,
    id?: string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface Profesor {
    usuarioId?: string,
    clubId?: string,
    activo?: number
}

export interface AlumnoUsuario {
    usuarioId?: string,
    profesorId?: string,
    nacimiento?: string,
    activo?: number
}

export interface Alumno {
    nombre?: string,
    apellidos?: string,
    password?: string,
    email?: string,
    email2?: string,
    tipo?: number,
    telefono?: string,
    telefono2?: string,
    genero?: string,
    avatar?: string,
    nivel?: string,
    id?: string,
    usuarioId?: string,
    profesorId?: string,
    nacimiento?: string,
    observaciones?: string,
    color?:string,
    foto?:any,
    asistencia?:number,
    colorTarjeta?:string,
    animaTarjeta?:boolean
    
}

export interface ComiteTecnico {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    fecha?: string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}
export interface DetalleTecnico {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    comiteTecnicoId?:string,
    golpe?: string,
    preparacion?: string,
    puntoImpacto?: string,
    coordPies?: string,
    terminacion?: string,
    puntuacion?:number
}
export interface Comportamiento {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    comiteTecnicoId?:string,
    nombre?: string,
    observaciones?: string,
}
export interface Falta {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    fecha?: string,
    motivo?: string,
    observaciones?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface Pago {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    fecha?: string,
    cantidad?: string,
    moneda?:string,
    observaciones?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}
export interface OpinionTutor {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    comiteTecnicoId?:string,
   opinion?: string,

}

export interface OpinionEntrenador {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    comiteTecnicoId?:string,
   opinion?: string,

}

export interface Sugerencia {
    id?:string,
    alumnoId?: string,
    profesorId?: string,
    comiteTecnicoId?:string,
    sugerencia?: string,
    
}


export interface Ejercicio {
    id?:string,
    usuarioId?: string,
    grupoEjerciciosId?: string,
    animacionId?:string,
    videoId?: string,
    nombre?:string,
    descripcion?:string,
    cod_ejercicio?:string,
    activo?:boolean,
    check?:boolean,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface EjercicioExplora {
    id?:string,
    grupoEjerciciosId?: string,
    animacionId?:string,
    videoId?: string,
    nombre?:string,
    descripcion?:string,
    cod_ejercicio?:string,
    activo?:boolean,
    check?:boolean,
    colorTarjeta?:string,
    nombreEjercicio?:string,
    acordeonAbierto?:boolean
    
}


export interface AnimacionEjercicio {
    id?:string,
    id_ejercicio?: string,
    animacion?: string,
    figuras?:string,
    pista?: string,
    canvasWidth?:number,
    canvasHeight?:number
}

export interface Grupo{
    id?:string,
    profesorId?: string,
    nombre?:string,
    activo?: boolean,
    color?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
    
}

export interface GrupoEjercicios{
    id?:string,
    nombre?:string,
    descripcion?:string
    usuarioId?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface GrupoAlumnos{
    id?:string,
    grupoId?:string,
    alumnoId?:string,
    usuarioId?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}


export interface Planificacion{
    id?:string,
    nombre?:string,
    descripcion?:string
    usuarioId?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface Trimestre{
    id?:string,
    nombre?:string,
    descripcion?:string
    usuarioId?:string,
    planificacionId?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface Semana{
    id?:string,
    nombre?:string,
    descripcion?:string
    usuarioId?:string,
    planificacionId?:string,
    trimestreId?:string,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface SemanaPlanificacionEjercicio{
    id?:string,
    usuarioId?:string,
    semanaId?:string,
    ejercicioId?:string,
    seccion?:number,
    posicion?:number,
    nombreEjercicio?:string,
    ejercicioExplora?:boolean,
    colorTarjeta?:string,
    animaTarjeta?:boolean

}


export interface Clase {
    id?:string,
    nombre?: string,
    profesorId?: string,
    fecha?: string,
    horaInicio?: string,
    horaFin?: string,
    nivel?:number,
    observaciones?: string,
    tipoPlanificacion?:string,
    planificacionId?: string,
    trimestreId?: string,
    semanaId?: string,
    alumnoId?:string,
    grupoId?:string,
    nombreSemana?:string,
    nombreGrupo?:string,
    nombreAlumno?:string,
    puntuacion?:number,
    color?:string,
    alumnosId?:string,
    guardada?:number,
    conjuntoClases?:boolean,
    colorTarjeta?:string,
    animaTarjeta?:boolean
}

export interface GrupoVideoLibro{
    id?:string,
    tituloEs?:string,
    tituloEn?:string,
    tituloPt?:string,
    descripcionEs?:string,
    descripcionEn?:string,
    descripcionPt?:string,
    activo?:string,
    foto?:any
}

export interface VideoLibro{
    id?:string,
    url?:string,
    titulo?:string,
    descripcionEs?:string,
    cod_video?:string,
    idGrupo?:number,
    activo?:number,
    consejo?:number,
    posicion?:number,
}

export interface CategoriaPlanificacionExplora{
    id?:string,
    titulo?:string,
    activa?:number,
}

export interface NivelPlanificacionExplora{
    id?:string,
    categoriaId?:string,
    titulo?:string,
    activo?:number,
}

export interface SemanaExplora{
    id?:string,
    trimestreId?:number,
    nivelId?:number,
    titulo?:string,

}

export interface SemanaPlanificacionExploraEjercicio{
    id?:string,
    usuarioId?:string,
    semanaId?:string,
    ejercicioId?:number,
    cod_ejercicio?:string,
    seccionId?:number,
    subseccionId?:number,
    posicion?:number,
    nombreEjercicio?:string
}

export interface AsistenciaAlumno{

    usuarioId?:string,
    claseId?:string,
    alumnoId?:string,
    id?:string,
}


export interface VideoEjercicio{

    ejercicioId?:string,
    cod_ejercicio?:string,
    id?:string,
}


export interface SeccionExplora{

    posicion?:number,
    nombre?:string,
    id?:string,
    semanasId?:string,
    subsecciones?: SubSeccionExplora[]
}

export interface SubSeccionExplora{

    posicion?:number,
    nombre?:string,
    id?:string,
    semanaId?:string,
    seccionId?:string,
    ejercicios?: EjercicioExplora[],
    acordeonAbierto?:boolean
}