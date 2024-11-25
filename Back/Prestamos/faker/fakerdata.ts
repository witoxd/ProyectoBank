import { User } from "../models/User";


import { faker } from '@faker-js/faker';

async function createFakeData() {
    // Crear clientes falsos
    for (let i = 0; i < 50; i++) {
        await User.create({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            adress: faker.address.streetAddress(),
            phone: faker.phone.number(),
            password: faker.internet.password(),
            is_active: faker.datatype.boolean(),
        });
    }


}

createFakeData().then(() => {
    console.log('Datos falsos creados exitosamente');
}).catch((error) => {
    console.error('Error al crear datos falsos:', error);
});

// Para ejecutar este script, ejecute el siguiente comando:
// npm install -g ts-node
// ts-node Prestamos/faker/fakerdata.ts
// npm install faker @faker-js/faker