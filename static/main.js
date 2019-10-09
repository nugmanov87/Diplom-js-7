'use strict';

/*1. В файле main.js объявите класс Profile.
2. Реализуйте конструктор класса. Экземпляр класса принимает на вход объект со следующими ключами:
Имя пользователя — строка.
Реальное имя — объект с ключами "имя" и "фамилия".
Пароль — строка.*/

class Profile {
    constructor({ username, name: { firstName, lastName }, password }) {
        this.username = username;
        this.name = { firstName, lastName };
        this.password = password;
    }

    // 3. Реализуйте метод _Добавление нового пользователя_ — метод вызывается с данными, полученными из конструктора класса.
    createUser(callback) {
        return ApiConnector.createUser(
            { username: this.username, name: this.name, password: this.password },
            (err, data) => {
                console.log(`Adding ${this.username}`);
                callback(err, data);
            }
        );
    }

    // 4. Реализуйте метод _Авторизация_ — метод вызывается с данными, полученными из конструктора класса.
    performLogin(callback) {
        return ApiConnector.performLogin(
            { username: this.username, name: this.name, password: this.password },
            (err, data) => {
                console.log(`Authorized ${this.username}`);
                callback(err, data);
            }
        );
    }
    // 5. Реализуйте метод _Добавление денег в личный кошелек_ — метод принимает на вход объект с двумя ключами: валюта (_строка_) и количество денег (_число_).

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`User ${this.username} plans to Deposit ${amount} ${currency}.`);
            callback(err, data);
        });
    }

    /* 6. Реализуйте метод _Конвертация валют_ — метод принимает на вход объект с тремя ключами: из какой валюты конвертируем (_строка_), 
    в какую валюту конвертируем (_строка_), конвертированная (целевая) сумма (_число_).*/
    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney(
            { fromCurrency, targetCurrency, targetAmount },
            (err, data) => {
                console.log(
                    `It is planned to convert to ${targetAmount} ${targetCurrency} of ${fromCurrency}.`
                );
                callback(err, data);
            }
        );
    }

    /* 7. Реализуйте метод _Перевод токенов другому пользователю_ — метод принимает на вход объект с двумя ключами: 
   кому (_строка_, имя пользователя), количество денег (_число_).*/

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Translated ${to} of ${this.username} just ${amount}`);
            callback(err, data);
        });
    }
}

/*8. После реализации всех методов класса `Profile` за его пределами реализуйте функцию получения курса валют с сервера.  
   В данной функции нужно использовать метод `getStocks` класса `ApiConnector`. Сохраните данные, полученные в результате 
   вызова `getStocks`, в переменную*/

const getCourceCurrency = callback => {
    return ApiConnector.getStocks((err, data) => {
        console.log('The exchange rate is requested from the server');
        callback(err, data);
    });
};

// Решение второй части задания

function main() {
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });

    const Roman = new Profile({
        username: 'roman',
        name: { firstName: 'Roman', lastName: 'Sidorov' },
        password: 'rosido',
    });

    Ivan.createUser((err, data) => {
        if (err) {
            console.error('Error adding new user');
        } else {
            console.log(`Added a new user ${Ivan.username}`);

            Ivan.performLogin((err, data) => {
                if (err) {
                    console.error('User authorization error');
                } else {
                    console.log(`The ${Ivan.username} is logged in`);
                    const userMoney = { currency: 'RUB', amount: 900000 };
                    Ivan.addMoney(userMoney, (err, data) => {
                        if (err) {
                            console.error('Error during adding money to Ivan');
                        } else {
                            console.log(
                                `User ${Ivan.username} made on account of ${userMoney.amount} ${userMoney.currency}.`
                            );
                            getCourceCurrency((err, data) => {
                                if (err) {
                                    console.error('An error occurred while collecting data.');
                                } else {
                                    let resultOfGetCourceCurrency = data[93].RUB_NETCOIN;
                                    const convertingMoney = {
                                        fromCurrency: userMoney.currency,
                                        targetCurrency: 'NETCOIN',
                                        targetAmount: 0,
                                    };
                                    convertingMoney.targetAmount =
                                        resultOfGetCourceCurrency * userMoney.amount;

                                    Ivan.convertMoney(convertingMoney, (err, data) => {
                                        if (err) {
                                            console.error('Currency conversion error');
                                        } else {
                                            console.log(
                                                `Conversion made ${userMoney.amount} ${convertingMoney.fromCurrency} in ${convertingMoney.targetAmount} ${convertingMoney.targetCurrency}.`
                                            );

                                            Roman.createUser((err, data) => {
                                                if (err) {
                                                    console.error('Error adding new user');
                                                } else {
                                                    console.log(
                                                        `Added a new user ${Roman.username}`
                                                    );
                                                    const targetUser = {
                                                        to: 'roman',
                                                        amount: convertingMoney.targetAmount,
                                                    };

                                                    Ivan.transferMoney(targetUser, (err, data) => {
                                                        if (err) {
                                                            console.error(
                                                                `Error during transfering money to ${Roman.username}`
                                                            );
                                                        } else {
                                                            console.log(
                                                                `The transfer ${targetUser.amount} user ${targetUser.to}.`
                                                            );
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}
main();
