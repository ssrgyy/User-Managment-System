import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

const fileRegUsersPath = './db/registered-users.json';
const fileUsersPath = './db/users.json';
const fileCitiesPath = './db/cities.json';

const initFileUsers = () => {
    const usersData = [
        {
            "id": "23c5e041-364e-4ecb-817a-39c4d87738d1",
            "fio": "Иванов Иван Иванович",
            "cityId": "e142854b-5f57-4289-8400-be3b9c06d8ac"
        },
        {
            "id": "1856d233-fe1c-4ff3-9567-97a92e97f949",
            "fio": "Маркова Кира Валерьевна",
            "cityId": "954157f6-d03b-43f7-916a-b6b796a47af8"
        },
        {
            "id": "14a24813-4816-4a8b-befc-908cb240b293",
            "fio": "Васильев Михаил Фёдорович",
            "cityId": "41c9dab1-ed3f-4ca8-b07f-aa1501290911"
        },
        {
            "id": "139b843e-c68a-4b43-a165-397d9e0420de",
            "fio": "Богданов Константин Иванович",
            "cityId": "e142854b-5f57-4289-8400-be3b9c06d8ac"
        },
        {
            "id": "687ae826-224d-4d4f-a60d-57c42608cd2a",
            "fio": "Новикова Алиса Родионовна",
            "cityId": "67536add-eed5-4cc1-8e03-7c5d14d6d249"
        },
    
        {
            "id": "10d62e2a-bcaf-48f8-84ef-12d80bfe4695",
            "fio": "Левин Егор Фёдорович",
            "cityId": "41c9dab1-ed3f-4ca8-b07f-aa1501290911"
        },
        {
            "id": "ff0077cc-c41c-44e7-93da-4d81133ba37d",
            "fio": "Иванова Милана Данииловна",
            "cityId": "474fe94b-4f12-4b8f-8cc1-815677b16bae"
        },
        {
            "id": "2eaeb0cf-6e0d-4eb9-9001-6702984c6c28",
            "fio": "Федорова Ульяна Константиновна",
            "cityId": "67536add-eed5-4cc1-8e03-7c5d14d6d249"
        },
        {
            "id": "8e1129ef-501e-4301-8e4b-b57b5263812e",
            "fio": "Ерофеева Алёна Тимофеевна",
            "cityId": "67536add-eed5-4cc1-8e03-7c5d14d6d249"
        },
        {
            "id": "9f667e7e-d267-4a30-aef9-4ea09aeaa0ae",
            "fio": "Маркина Анна Кирилловна",
            "cityId": "474fe94b-4f12-4b8f-8cc1-815677b16bae"
        },
        {
            "id": "a49f5a29-f26a-4b4b-a42f-169aa45d1971",
            "fio": "Пономарев Мирон Артёмович",
            "cityId": "e142854b-5f57-4289-8400-be3b9c06d8ac"
        },
        {
            "id": "bb754c9d-dfd2-4720-a268-38072bb76538",
            "fio": "Назаров Михаил Тимофеевич",
            "cityId": "41c9dab1-ed3f-4ca8-b07f-aa1501290911"
        },
        {
            "id": "1caeaf29-eb33-46ff-a404-cd98a10f897d",
            "fio": "Семенов Артём Кириллович",
            "cityId": "954157f6-d03b-43f7-916a-b6b796a47af8"
        }
    ];

    fs.writeFile('./db/users.json', JSON.stringify(usersData), error => {
        console.error(error);
    });
}

initFileUsers();

app.post('/login', (req, res) => {
    console.log('/login: ', req.body);

    fs.readFile(fileRegUsersPath, (error, registeredUserData) => {
        if (error) {
            res.send(401);
            return;
        }

        const {login, password} = req.body;
        const registeredUserList = JSON.parse(registeredUserData);
        let registeredUserIndex = -1;

        for (let i = 0, length = registeredUserList.length; i < length; i++) {
            const registeredUser = registeredUserList[i];

            if (registeredUser.login === login && registeredUser.password === password) {
                registeredUserIndex = i;
                break;
            }
        }

        if (registeredUserIndex < 0) {
            res.send(401);
            return;
        }

        const registredUser = registeredUserList[registeredUserIndex];

        res.json({
            regId: registredUser.regId,
            userFio: registredUser.userFio
        });
    });
});

app.post('/user_list', (req, res) => {
    fs.readFile(fileUsersPath, (error, fileUsersData) => {
        if (error) {
            res.status(404);
            return;
        }

        fs.readFile(fileCitiesPath, (error, fileCitiesData) => {
            if (error) {
                res.status(404);
                return;
            }

            let {elementsOnPage, page} = req.body;

            if (elementsOnPage < 0)
                elementsOnPage = 0;

            if (page < 0)
                page = 0;

            const userDataList = JSON.parse(fileUsersData);
            const cityDataList = JSON.parse(fileCitiesData);
    
            const getDataListByPage = (page) => {
                const pageDataList = [];

                for (let i = elementsOnPage * page,
                    length = userDataList.length,
                    temp = elementsOnPage * (page + 1),
                    max = temp < length ? temp : length; i < max; i++) {
                        const userData = userDataList[i];
                        let cityIndex = -1;
                        
                        for (let j = 0, length = cityDataList.length; j < length; j++) {
                            if (cityDataList[j].id === userData.cityId)
                                cityIndex = j;
                        }

                        if (cityIndex === -1)
                            res.status(404);

                        pageDataList.push({
                            user: userDataList[i],
                            city: cityDataList[cityIndex]
                        });
                }

                return pageDataList;
            }

            let pageDataList = getDataListByPage(page);

            if (pageDataList.length < 1) {
                page = 0;
                pageDataList = getDataListByPage(page);
            }

            const responseData = {
                page,
                pageData: pageDataList
            };

            res.json(responseData);
        });
    });
});

app.post('/cities', (req, res) => {
    fs.readFile(fileCitiesPath, (error, fileCitiesData) => {
        if (error) {
            res.status(404);
            return;
        }

        res.json(JSON.parse(fileCitiesData));
    });
});

app.put('/delete_user', (req, res) => {
    console.log('/delete_user: ', req.body);
    const {userId} = req.body;

    fs.readFile(fileUsersPath, (error, fileUsersData) => {
        if (error) {
            res.status(404);
            return;
        }

        let userDataList = JSON.parse(fileUsersData);

        let userDataIndex = -1;

        for (let i = 0, length = userDataList.length; i < length; i++) {
            if (userDataList[i].id === userId) {
                userDataIndex = i;
                break;
            }
        }

        if (userDataIndex < 0) {
            res.status(404);
            return;
        }

        userDataList.splice(userDataIndex, 1);

        fs.writeFile(fileUsersPath, JSON.stringify(userDataList), error => {
            if (error) {
                res.status(404);
                return;
            }

            res.json({isDeleted: true});
        });
    });
})

app.put('/add_user', (req, res) => {
    console.log(req.body);
    const {userFio, cityId} = req.body;

    fs.readFile(fileUsersPath, (error, fileUsersData) => {
        if (error) {
            res.status(404);
            return;
        }

        const userDataList = JSON.parse(fileUsersData);

        userDataList.push({
            id: uuidv4(),
            fio: userFio,
            cityId
        });

        fs.writeFile(fileUsersPath, JSON.stringify(userDataList), (error) => {
            if (error) {
                res.send(404);
                return;
            }

            res.status(200);
        });
    })
});

app.put('/edit_user', (req, res) => {
    console.log(req.body);
    const {userId, userFio, cityId} = req.body;

    fs.readFile(fileUsersPath, (error, fileUsersData) => {
        if (error) {
            res.status(404);
            return;
        }

        let userDataList = JSON.parse(fileUsersData);

        userDataList = userDataList.map(userData => {
            if (userData.id === userId) {
                return {
                    ...userData,
                    fio: userFio,
                    cityId
                };
            }

            return userData;
        });

        fs.writeFile(fileUsersPath, JSON.stringify(userDataList), error => {
            if (error) {
                res.status(404);
                return;
            }

            res.status(200);
        });
    });
});

app.listen(PORT, () => console.log('SERVER STARTED. PORT: ' + PORT));