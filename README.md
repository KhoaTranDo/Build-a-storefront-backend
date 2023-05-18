# Storefront Backend Project

## Getting Started
Install all packages using in this project
- 'yarn' or 'npm install'

## Setup ENV
- Add file '.env' into root folder
```
POSTGRES_HOST = '127.0.0.1'
POSTGRES_DB = 'storefront'
POSTGRES_TEST_DB = 'storefront-test'
POSTGRES_USER = 'postgres'
POSTGRES_PASSWORD = 'password123'
POSTGRES_PORT = 5432
ENV=dev
SECRET_JWT = "udacity"
BCRYPT_PASSWORD = "hash-password"
SALT = "10"
```
## Migrate run
- 'db-migrate up'

## Start code
- 'npm run start'

## Run test
- 'npm run test'