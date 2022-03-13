import 'dotenv/config'
// require('dotenv').config() 
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DB_URL)
export default async function getCompanies () {
   let resp;
    try {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(process.env.DB_NAME);
      const coll = db.collection(process.env.COLL_NAME);
      resp = await coll.findOne({"name": "meta"})
    } finally {
      await client.close();
    }
  return resp.companies
}
//.catch(console.dir)

export default async function getCompany () {
  let resp;
   try {
     await client.connect();
     console.log('Connected successfully to server');
     const db = client.db(process.env.DB_NAME);
     const coll = db.collection(process.env.COLL_NAME);
     resp = await coll.findOne({"name": "meta"})
   } finally {
     await client.close();
   }
 return resp.company
}
