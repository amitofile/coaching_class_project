import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

/*
* Every user in coaching class has account.
*/
@Unique('unq_username', ['userName', 'userRole'])
@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    passwordExpiry: number;

    @Column()
    userId: number;

    @Column()
    userRole: string;

    @Column()
    status: string;

}

/*
* These are login details
*/
@Entity()
export class Login {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    timestamp: string;

    @Column()
    status: string;
    
}