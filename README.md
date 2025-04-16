Authors:
1. Surushti Mahida
2. Esteban Rosero

Tools:
pgAdmin
PostgreSQL
GitHub
Docker 
Postman
LucidChart

Features:
ERD image
Migration script

Project Overview:
The purpose of designing this project are:
1.Create all the tables and populate them
2.CRUD functions to interact with each table
3.Unit and Integration tests that covers the CRUD operations

Technical Requirements:
-TypeScript-based project
-TypeORM for database interactions
-Containerized setup

How to Install:

1. Clone Repository
-git clone 
-cd persistence-service

2. Open Docker

3. Use the command docker-compose up -d --build to start the services

4. Open pgAdmin
- Connect to the PostgreSQL server

5. Open the Query Tool:
-Right-click on the pg-persistence-service-development database.
-Select "Query Tool".
-Paste the content of the migration script.
-Click the execute button or press the F5 button.

6. Running Tests (Unit Test)
-Open Postman
-Create collection
-Add requests
-Test each request

This README provides all the necessary steps to set up, run, and test this project. 

