### I. First install the docker image of postgres if you want to use with docker:

root\* `docker run --name newsportal -e POSTGRES_PASSWORD=postgres -dp 5432:5432 postgres `

### II. go to the backend dir and install node packages

- `npm i`

### III. If you are running for the first time or have made changes in the schema run the prisma commands:

- `npx prisma migrate dev --name init`

### IV. Run the backend dev server

- `npm run dev`

### V. Base URL for the project

- `http://localhost:4000/api/{anyspecific url}`

### VI. check the swagger docs

- `http://localhost:4000/api-docs`

### VII. Update the swagger docs

- `tsnodesrc/utils/swagger.ts`

## For mailing service here:

1. Go to the link below and get the ethereal id and password and copy paste to the .env file - https://ethereal.email/
2. All of the messages are not sent directly to the gmail instead it is sent to the same Ethereal account. You can view the message in the inbox.
