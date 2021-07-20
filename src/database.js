
import { Pool } from 'pg'

export const pool = new Pool(
{
host:'ec2-52-5-1-20.compute-1.amazonaws.com',
user:'hgmqnigjdqzvjp',
password:'d0d41c484ed6041e13b2390997cf2636ea45068d85376423a2487feb64404292',
database:'d9j1ftv84ub4g4',
port:5432,
/*
host:'ec2-3-217-219-146.compute-1.amazonaws.com',
user:'qjtsemqehmswjr',
password:'91ec850c748fafc740074f46d617e2e3fbc2c81d77c1eee81bcaaa458a926dc4',
database:'d55phaknri2in4',
port:5432,*/
ssl: { rejectUnauthorized: false}

}
);