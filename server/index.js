import express from "express";
import cors from "cors";
import fs from "fs";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

app.post('/user_list', (req, res) => {
    let {elementsOnPage, page} = req.body;

    if (elementsOnPage < 0)
        elementsOnPage = 0;

    if (page < 0)
        page = 0;

    fs.readFile('./db/users.json', 'utf8', (error, usersFileData) => {
        if (error)
            res.status(404);

        fs.readFile('./db/cities.json', 'utf8', (error, citiesFileData) => {
            if (error)
                res.status(404);

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

app.listen(PORT, () => console.log('SERVER STARTED. PORT: ' + PORT));