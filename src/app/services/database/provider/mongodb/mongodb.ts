import { IProvider } from "../i-provider";
import { MongoClient, ServerApiVersion } from "mongodb";

export class MongoDb implements IProvider {
  disconnect(): void {
    throw new Error("Method not implemented.");
  }
  insert(table: string, data: any, key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(table: string, data: any, search: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(table: string, search: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  select(table: string, search: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async connect() {
    const uri = "";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await this.run(client).catch(console.dir);
  }

  async run(client: MongoClient) {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
}
