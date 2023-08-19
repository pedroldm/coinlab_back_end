# coinlab-back-end


### Docker
```
docker build -t api .
docker run -d --name api-container -e TZ=BRT -p 30432:5432 -p 3000:3000 api
```