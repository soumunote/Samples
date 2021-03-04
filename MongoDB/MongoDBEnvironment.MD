# Dockerを使用して、簡単な MongDB の環境作成

参考)
[dockerHub/mongo](https://hub.docker.com/_/mongo)

## 環境作成
### MongoServer
```
MONGO_ROOT_PASSWD=P@ssw0rd
docker run -d --name mongo-server -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWD} -p 27017:27017 mongo
```
### MongoClient
```
docker run -it --rm mongo mongo --host ${ADDRESS_OF_SERVER} -u root -p P@ssw0rd --authenticationDatabase admin mydb
```
