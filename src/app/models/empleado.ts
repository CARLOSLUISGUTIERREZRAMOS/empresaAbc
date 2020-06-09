import { DocumentReference } from 'angularfire2/firestore';

export class Empleado{
    idEmpleado: number;
    nomEmpleado: string;
    apeEmpleado : string;
    fecNacimiento: Date;
    fecIngreso: Date;
    impAfp: number;
    desCargo: string;
    impSueldo: number;
    constructor(){
        this.idEmpleado = this.idEmpleado;
        this.nomEmpleado = this.nomEmpleado;
        this.apeEmpleado = this.apeEmpleado;
        this.fecNacimiento = this.fecNacimiento;
        this.fecIngreso = this.fecIngreso;
        this.impAfp = this.impAfp;
        this.desCargo = this.desCargo;
        this.impSueldo = this.impSueldo;
    }
}