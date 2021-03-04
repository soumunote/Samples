# Dockerを使用して、簡単な MongDB の環境作成

参考)
[dockerHub/mongo](https://hub.docker.com/_/mongo)

## 環境作成
### MongoServer
```sh
ADDRESS_OF_SERVER=192.168.11.100
MONGO_ROOT_PASSWD=P@ssw0rd
docker run -d --name mongo-server \
           -e MONGO_INITDB_ROOT_USERNAME=root \
           -e MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWD} \
           -p 27017:27017 mongo
docker run -it --rm mongo mongo --host ${ADDRESS_OF_SERVER} -u root -p ${MONGO_ROOT_PASSWD} \ 
            --authenticationDatabase admin mydb
```

## 接続サンプル
```javascript
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ryo:<password>@cluster0.hybcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
```
