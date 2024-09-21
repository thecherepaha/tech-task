
# 🚀 TypeScript Express API with Knex

## 📂 Project Structure
```
├── api               # API route definitions
├── controller        # Controllers to handle requests
├── db                # Knex configurations and migrations
├── dist              # Compiled JS files for production
├── interfaces        # TypeScript interfaces
├── model             # Models for database interactions
├── schemas           # Validation schemas
├── utils             # Helper functions
├── validation        # Validation logic
├── server.ts         # Entry point for the server
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── .env              # Environment variables
```

## 🛠️ Installation

### Prerequisites
- **Node.js** and **npm**

### Clone and Install Dependencies

```bash
git clone https://github.com/thecherepaha/tech-task.git
cd tech-task
npm install
```

### Run in Development

```bash
npm run dev
```

### Migrate Database

```bash
npm run migrate
```

### Build and Run in Production

```bash
npm run production
```

## 📝 API Endpoints

- **GET /cars**: Fetch cars with filtering.
- **POST /car**: Create a new car.

## 📜 Environment Variables

Create a `.env` file:

```
SERVER_PORT=8080
DB_CLIENT=pg
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
```

## 🛠️ Technologies

- **TypeScript**: Strong typing.
- **Express**: Web framework.
- **Knex.js**: SQL query builder.
- **Module Aliases**: Clean imports.
- **ts-node-dev**: Development server.

## 📞 Contact

- GitHub: [@thecherepaha](https://github.com/thecherepaha)
