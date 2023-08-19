# coinlab-back-end


### Docker
```
docker build -t api .
docker run -d --name api-container -e TZ=BRT -e POSTGRES_PASSWORD=postgres -p 30432:5432 -p 3000:3000 api
docker ps -a
docker exec -it 4db6359a5efa /bin/bash
cd coinlab-back-end
npm run dev
```