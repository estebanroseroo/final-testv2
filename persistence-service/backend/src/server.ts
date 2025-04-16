import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";
import { Photo } from "./strategy/postgresql/photo";

async function datamanager(environment: "prod" | "test") {
  if (environment === "prod") {
    return postgresDataSource.initialize();
  }
  
  return {
    manager: {
      find: (entity: any) => {
        return {
          name: "a testname",
          description: "description",
          filename: "photo-with-bears.jpg",
          views: 1,
          isPublished: true,
        };
      },
      save: (entity: any) => {
        console.log("Mock save called with", entity);
        return Promise.resolve(entity);
      }
    }
  }
}

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const datasource = process.env.IS_PROD ? await datamanager("prod") : await datamanager("test");

  app.get("/bearphoto", async (_, res) => {
    const result = await datasource.manager.find(Photo);
    console.log(result);
    return res.send(result);
  });

  app.get("/sample", (_, res) => {
    return res.send("hello world 2")
  });

  const validName = (name: string): boolean => {
    return /bear/i.test(name);
  }

  app.post("/bearphoto/:name/:description", async (req, res) => {
    const { name, description } = req.params;

    if (!name || name.trim() === "") {
      res.status(400);
      return res.send("The name is empty.");
    }

    if (!validName(name)) {
      res.status(302);
      return res.send(`"${name} is not a valid name for a bear photo"`);
    }

    const photo = new Photo();
    photo.name = name;
    photo.description = description;
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;

    try {
      await datasource.manager.save(photo);
      return res.send({ message: "This operation was successful."});
    } catch (error) {
      res.status(503).json({ error: "This operation was unsuccessful." });
    }
  });

  const testPostApi = async (name: string, description: string, expectedStatus: number, expectedMessage: string) => {
    const response = await fetch(`http://localhost:8000/bearphoto/${name}/${description}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.text();

    if (response.status === expectedStatus && result.includes(expectedMessage)) {
      console.log(`Test Passed for name "${name}"`);
    } else {
      console.error(`Test Failed for name "${name}"`);
      console.error(`Expected Status: ${expectedStatus}, Actual Status: ${response.status}`);
      console.error(`Expected Message: ${expectedMessage}, Actual Message: ${result}`);
    }
  };

  app.listen(8000, () => {
    console.log(`express server started on 8000`);
    testPostApi("bearphoto", "description", 200, "This operation was successful.");
    testPostApi("cat", "description", 302, '"cat is not a valid name for a bear photo"');
    testPostApi("", "description", 400, "The name is empty.");
    testPostApi("elephant", "description", 302, '"elephant is not a valid name for a bear photo"');
  });
})().catch((err) => console.log(err));
