We are looking to create a front-end that lists the existing Funds that are stored in a database and are accessible through a REST API, see the details of a specific Fund and allow inserting a new Fund (all of this is open in how to implement it).

To do this we have the following APIs:

1. List all funds, (if we can make a table showing them): curl -i -H Accept:application/json -X GET http://129.213.112.144:8080/captain/funds

2. View one fund (maybe in the same page, up to you): curl -i -H Accept:application/json -X GET http://129.213.112.144:8080/captain/funds/1

3. Create a new fund: curl -i -H Accept:application/json -X POST http://129.213.112.144:8080/captain/funds -H Content-Type:application/json -d '{"fund_name": "Fund ABC", "fund_manager": {"fund_manager_id": "mjones@thefundone.com"}}'

3b. please notice that it takes two parameters, the fund's name and its manager (using i's id), to see the full list of managers (which I guess you can take from an option/combo/list you can use  curl -i -H Accept:application/json -X GET http://129.213.112.144:8080/captain/fund_managers to get the full list, please be aware that the manager has to exist for the API to work.

4. Lastly, to delete a fund: curl -i -H Accept:application/json -X DELETE http://129.213.112.144:8080/captain/funds/43

5. Bonus point: document the API with Swagger or similar.