import * as sdk from "node-appwrite";

// Directly assign the values
const PROJECT_ID = "66c23f40003367bd93ae";
const API_KEY = "6150c2321b25ff3299b4087557427c2483a9907b8259e519c0dc535e1b1ec2f52777d87f9db9203c1b378a2b513e155e31ed432258986cb50170ea41e1c2b6cea4f26a3839098dbb2170488f6207e9abdfec54b6489477264b8ad0857e63b207c709c9f8d1cc7480231757f303367c2ed045daffa9229dd4d5789f6360e1cba8";
const DATABASE_ID = "66c23fe900165a9e292f";
const PATIENT_COLLECTION_ID = "66c24021003b699c2fc8";
const DOCTOR_COLLECTION_ID = "66c24061001153c7f8cc";
const APPOINTMENT_COLLECTION_ID = "66c2409a002f27a40c6b";
const BUCKET_ID = "66c24460000fcc42e801";
const ENDPOINT = "https://cloud.appwrite.io/v1";

console.log(PROJECT_ID);
if (!PROJECT_ID || !API_KEY || !ENDPOINT) {
  throw new Error("Missing environment variables for Appwrite configuration");
}

const client = new sdk.Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);