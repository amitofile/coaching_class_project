import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

/*
* This is Subject entity.
* Users with Teacher role can create subjects.
*/
@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    createDate: string;

    @Column()
    createById: number;

    @Column()
    totalIntake: number;

    @Column()
    status: string;

}

/*
* This is a Enrolment entity
* Only student can enrol for subject of choice
*/
@Entity()
export class Enrolment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subjectId: number;

    @Column()
    studentId: number;
    
}

/*
* This is Attendance entity
*/

@Entity()
export class Attendance {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subjectId: number;

    @Column()
    studentId: number;

    @Column()
    timestamp: string;

    @Column()
    status: string;
    
}