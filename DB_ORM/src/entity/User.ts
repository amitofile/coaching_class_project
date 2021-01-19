import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

/*
* This is a Staff entity
*/
@Unique(['emailId'])
@Unique(['mobileNo'])
@Entity()
export class Staff {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    emailId: string;

    @Column()
    mobileNo: string;

}

/*
* This is a Student entity
*/
@Unique(['emailId'])
@Unique(['mobileNo'])
@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    emailId: string;

    @Column()
    mobileNo: string;

}