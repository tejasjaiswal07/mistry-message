
import "next-auth";
import { DefaultSession } from "next-auth";
import { Interface } from "readline";
declare module "next-auth" {
    interface User {
        _id?: string;
        isVerified?: boolean;
        username?: string;
        isAcceptingMessages?: boolean;

    }
    interface Session {
        user: {
        _id?: string;
        isVerified?: boolean;
        username?: string;
        isAcceptingMessages?: boolean;
        }& DefaultSession["user"];
}


interface Token {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    isAcceptingMessages?: boolean;
}




}