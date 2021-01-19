import "reflect-metadata";
import { createConnection } from "typeorm";
import { Staff, Student } from "./entity/User";
import { Account, Login } from "./entity/Login";
import { Subject, Enrolment, Attendance } from "./entity/Subject";
import { createHash } from "crypto";


createConnection().then(async connection => {

    const staff = new Staff();
    const student = new Student();
    const account = new Account();
    const login = new Login();
    const subject = new Subject();
    const enrol = new Enrolment();
    const attendance = new Attendance();

    console.log("Inserting a new student into the database...");
    student.firstName = 'Amit';
    student.lastName = 'P';
    student.emailId = 'amit@gmail.com';
    student.mobileNo = '9876543210';
    await connection.manager
        .save(student)
        .then(async student => {
            console.log("Saved a new student with id: " + student.id);
            console.log("Inserting a new account into the database...");
            account.userId = student.id;
            account.userName = 'amitp';
            account.password = createHash('md5').update('amit@123').digest('hex');
            account.userRole = 'student';
            account.passwordExpiry = 30;
            account.status = 'active';
            await connection.manager
                .save(account)
                .then(account => {
                    console.log("Saved a new account with id: " + account.id);
                });
        });

}).catch(error => console.log(error));
