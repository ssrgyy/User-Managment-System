import express from "express";
import cors from "cors";
import fs from "fs";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

app.post('/login', (req, res) => {
    console.log(req.body);

    fs.readFile('./db/registered-users.json', 'utf8', (error, registeredUserData) => {
        if (error)
            res.send(401);

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
            
        fs.readFile('./db/users.json', 'utf8', (error, usersFileData) => {
            if (error)
                res.status(401);

            const userDataList = JSON.parse(usersFileData);
            const registeredUserId = registeredUserList[registeredUserIndex].id;
            let userDataIndex = -1;
            
            for (let i = 0, length = userDataList.length; i < length; i++) {
                if (userDataList[i].id === registeredUserId) {
                    userDataIndex = i;
                    break;
                }
            }

            if (userDataIndex < 0)
                res.send(401);

            res.json({
                id: registeredUserId,
                fio: userDataList[userDataIndex].fio
            });
        });
    });
});

app.post('/user_list', (req, res) => {
    fs.readFile('./db/users.json', 'utf8', (error, usersFileData) => {
        if (error)
            res.status(404);

        fs.readFile('./db/cities.json', 'utf8', (error, citiesFileData) => {
            if (error)
                res.status(404);

            let {elementsOnPage, page} = req.body;

            if (elementsOnPage < 0)
                elementsOnPage = 0;

            if (page < 0)
                page = 0;

            const userDataList = JSON.parse(usersFileData);
            const cityDataList = JSON.parse(citiesFileData);
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

            res.json(pageDataList);
        });
    });
});

app.post('/cities', (req, res) => {
    fs.readFile('./db/cities.json', 'utf8', (error, citiesFileData) => {
        if (error)
            res.status(404);

        res.json(JSON.parse(citiesFileData));
    });
});

app.post('/delete_user', (req, res) => {
    console.log(req.body);
    res.status(200);
})

app.put('/add_user', (req, res) => {
    console.log(req.body);
    res.status(200);
});

app.listen(PORT, () => console.log('SERVER STARTED. PORT: ' + PORT));