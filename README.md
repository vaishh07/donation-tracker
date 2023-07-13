# main-branch

## Running MongoDB containers
1. Create a docker network using 
    `docker network create mongo-network`
2. Create a mongoDB container 
    `docker run -d -p 27018:27017 --name mongodb --net mongo-network mongo`
    we are running it on port 27018 to avoid conflit with local mongoDb
3. Create a Mongo-express container
    `docker run -d -p 8081:8081 --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express`
    you can access mongo-express container on http://localhost:8081
4. Open Mongo-Express and create Database "donation_tracker" and a collection "donations"