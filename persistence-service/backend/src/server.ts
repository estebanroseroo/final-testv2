import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";
import { Personal } from "./strategy/postgresql/personal";
import { Movie } from "./strategy/postgresql/movie";
import { Contract } from "./strategy/postgresql/contract";
import { ProductionStaff } from "./strategy/postgresql/productionstaff";
import { Involvement } from "./strategy/postgresql/involvement";

async function datamanager(environment: "prod" | "test") {
  if (environment === "prod") {
    return postgresDataSource.initialize();
  }
  
  return {
    manager: {
      find: (entity: any) => {
        if (entity === Personal) {
          return Promise.resolve([
            {
              UnionID: 1,
              Name: "John Doe",
              DateOfBirth: new Date("1990-01-01"),
              Nationality: "Canadian",
              Biography: "An experienced actor.",
              ContactInfo: "john@example.com",
            },
          ]);
        } else if (entity === Movie) {
          return Promise.resolve([
            {
              MovieID: 101,
              Title: "Epic Adventure",
              ReleaseDate: new Date("2022-12-15"),
              AwardsWon: 5,
            },
          ]);
        } else if (entity === ProductionStaff) {
          return Promise.resolve([
            {
              UnionID: 1,
              Role: "Director",
              personal: {
                UnionID: 1,
                Name: "John Doe",
                DateOfBirth: new Date("1990-01-01"),
                Nationality: "Canadian",
                Biography: "An experienced actor.",
                ContactInfo: "john@example.com",
              },
            },
          ]);
        } else if (entity === Contract) {
          return Promise.resolve([
            {
              ContractID: 201,
              UnionID: 1,
              MovieID: 101,
              Cost: 50000.0,
              personal: {
                UnionID: 1,
                Name: "John Doe",
                DateOfBirth: new Date("1990-01-01"),
                Nationality: "Canadian",
                Biography: "An experienced actor.",
                ContactInfo: "john@example.com",
              },
              movie: {
                MovieID: 101,
                Title: "Epic Adventure",
                ReleaseDate: new Date("2022-12-15"),
                AwardsWon: 5,
              },
            },
          ]);
        } else if (entity === Involvement) {
          return Promise.resolve([
            {
              InvolvementID: 301,
              UnionID: 1,
              MovieID: 101,
              personal: {
                UnionID: 1,
                Name: "John Doe",
                DateOfBirth: new Date("1990-01-01"),
                Nationality: "Canadian",
                Biography: "An experienced actor.",
                ContactInfo: "john@example.com",
              },
              movie: {
                MovieID: 101,
                Title: "Epic Adventure",
                ReleaseDate: new Date("2022-12-15"),
                AwardsWon: 5,
              },
            },
          ]);
        }
        return Promise.resolve([]);
      },
      save: (entity: any) => {
        console.log("Mock save called with", entity);
        return Promise.resolve(entity);
      },
      update: (entity: any) => {
        console.log("Mock update called with", entity);
        return Promise.resolve(entity);
      },
      delete: (entity: any) => {
        console.log("Mock delete called with", entity);
        return Promise.resolve({ success: true });
      }
    }
  }
}

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const datasource = process.env.IS_PROD ? await datamanager("prod") : await datamanager("test");
  
  // GET API
  app.get("/personal", async (_, res) => {
    const result = await datasource.manager.find(Personal);
    console.log(result);
    return res.send(result);
  });

  app.get("/movie", async (_, res) => {
    const result = await datasource.manager.find(Movie);
    console.log(result);
    return res.send(result);
  });

  app.get("/contract", async (_, res) => {
    const result = await datasource.manager.find(Contract);
    console.log(result);
    return res.send(result);
  });

  app.get("/productionstaff", async (_, res) => {
    const result = await datasource.manager.find(ProductionStaff);
    console.log(result);
    return res.send(result);
  });

  app.get("/involvement", async (_, res) => {
    const result = await datasource.manager.find(Involvement);
    console.log(result);
    return res.send(result);
  });

  // POST API
  app.post("/personal", async (req, res) => {
    const data = req.body;
    const person = new Personal();
    person.Name = data.Name;
    person.DateOfBirth = new Date(data.DateOfBirth);
    person.Nationality = data.Nationality;
    person.Biography = data.Biography;
    person.ContactInfo = data.ContactInfo;
    await datasource.manager.save(person);
    return res.send({ message: "Personal saved successfully." });
  });

  app.post("/movie", async (req, res) => {
    const data = req.body;
    const movie = new Movie();
    movie.Title = data.Title;
    movie.ReleaseDate = new Date(data.ReleaseDate);
    movie.AwardsWon = data.AwardsWon;
    await datasource.manager.save(movie);
    return res.send({ message: "Movie saved successfully." });
  });

  app.post("/contract", async (req, res) => {
    const data = req.body;
    const contract = new Contract();
    contract.UnionID = data.UnionID;
    contract.MovieID = data.MovieID;
    contract.Cost = data.Cost;
    await datasource.manager.save(contract);
    return res.send({ message: "Contract saved successfully." });
  });

  app.post("/productionstaff", async (req, res) => {
    const data = req.body;
    const staff = new ProductionStaff();
    staff.UnionID = data.UnionID;
    staff.Role = data.Role;
    await datasource.manager.save(staff);
    return res.send({ message: "ProductionStaff saved successfully." });
  });

  app.post("/involvement", async (req, res) => {
    const data = req.body;
    const involvement = new Involvement();
    involvement.UnionID = data.UnionID;
    involvement.MovieID = data.MovieID;
    await datasource.manager.save(involvement);
    return res.send({ message: "Involvement saved successfully." });
  });
  
  // PUT API
  app.put("/personal/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updated = {
      UnionID: id,
      Name: data.Name,
      DateOfBirth: new Date(data.DateOfBirth),
      Nationality: data.Nationality,
      Biography: data.Biography,
      ContactInfo: data.ContactInfo
    };
    await datasource.manager.update(Personal, id, updated);
    return res.send({ message: "Personal updated successfully." });
  });
  
  app.put("/movie/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updated = {
      MovieID: id,
      Title: data.Title,
      ReleaseDate: new Date(data.ReleaseDate),
      AwardsWon: data.AwardsWon
    };
    await datasource.manager.update(Movie, id, updated);
    return res.send({ message: "Movie updated successfully." });
  });

  app.put("/contract/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updated = {
      ContractID: id,
      UnionID: data.UnionID,
      MovieID: data.MovieID,
      Cost: data.Cost
    };
    await datasource.manager.update(Contract, id, updated);
    return res.send({ message: "Contract updated successfully." });
  });

  app.put("/productionstaff/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updated = {
      UnionID: id,
      Role: data.Role
    };
    await datasource.manager.update(ProductionStaff, id, updated);
    return res.send({ message: "ProductionStaff updated successfully." });
  });

  app.put("/involvement/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updated = {
      InvolvementID: id,
      UnionID: data.UnionID,
      MovieID: data.MovieID
    };
    await datasource.manager.update(Involvement, id, updated);
    return res.send({ message: "Involvement updated successfully." });
  });
  
  // DELETE API
  app.delete("/personal/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await datasource.manager.delete(Personal, id);
    return res.send({ message: "Personal deleted successfully." });
  });

  app.delete("/movie/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await datasource.manager.delete(Movie, id);
    return res.send({ message: "Movie deleted successfully." });
  });
  
  app.delete("/contract/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await datasource.manager.delete(Contract, id);
    return res.send({ message: "Contract deleted successfully." });
  });

  app.delete("/productionstaff/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await datasource.manager.delete(ProductionStaff, id);
    return res.send({ message: "ProductionStaff deleted successfully." });
  });

  app.delete("/involvement/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await datasource.manager.delete(Involvement, id);
    return res.send({ message: "Involvement deleted successfully." });
  });
  
  app.listen(8000, () => {
    console.log(`express server started on 8000`);
  });
})().catch((err) => console.log(err));
