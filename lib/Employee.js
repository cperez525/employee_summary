class Employee {

    constructor(name, id, email, role) {

        this.name = name;
        this.id = id;
        this.role = role
        this.email = email
    }

    getName() {

        return this.name
    }

    getId() {

        return this.id
    }

    getEmail() {

        return this.email
    }

    getRole() {

        return "Employee"
    }
}   

module.exports = Employee