import type {NextConfig} from "next";

const nextConfig : NextConfig={
  env:{
    PUBLIC_DB_CONNECTION:"mongodb+srv://Racheli:aaabbb@cluster0.8lglp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  }
}

export default nextConfig;

