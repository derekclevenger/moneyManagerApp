
export class User {
    email: string;
    firstName: string;
    id: number;
    lastName:  string;
    password: string;
    salt: string;

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    getFirstName() {
        return this.firstName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    getLastName() {
        return this.lastName;
    }
}
