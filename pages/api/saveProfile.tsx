// pages/api/saveProfile.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../utils/db'
import bcrypt from 'bcrypt'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, phone, address, password } = req.body
  // console.log("try to update user",username,email,phone,address,password)
  try {
    let isChangePWD = false
    if (password){
        isChangePWD = true
    }

    const db = process.env.POSTGRES_DATABASE;

        if (isChangePWD) {
        // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
        // your application becomes.
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `UPDATE ${db}.users SET name = $1, password = $2, phone = $3, address = $4 WHERE email = $5`,
            [username, hashedPassword, phone, address, email]
        )
        } else {
        await pool.query(
            `UPDATE ${db}.users SET name = $1, phone = $2, address = $3 WHERE email = $4`,
            [username, phone, address, email]
        )
        }

    // Get the updated user
    const { rows: [updatedUser] } = await pool.query(`SELECT * FROM ${db}.users WHERE email = $1`, [email]);

    res.status(200).json({ message: 'Update successful', user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: (error as Error).message })
  }
}