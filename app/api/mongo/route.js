import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function GET(request) {
  const uri =
    "mongodb+srv://happykamboj:VO4FxXW6BVJrBpBn@stockmanagement.jildjp6.mongodb.net/?retryWrites=true&w=majority";
  // "mongodb+srv://happykamboj:VO4FxXW6BVJrBpBn@stockmanagement.jildjp6.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock");
    const movies = database.collection("inventory");

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const product = await movies.find(query).toArray();
    return NextResponse.json({ a: 34, product });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  //   run().catch(console.dir);
}
