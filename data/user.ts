import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
   try {
      const user = await db.user.findUnique({
         where: {
            email
         }
      })

      return user
      
   } catch (error) {
      console.log('Error: ', error)
      return null
   }
}

export const getUserById = async (id: string) => {
   try {
      const user = await db.user.findUnique({
         where: {
            id
         }
      })

      return user

   } catch {
      return null
   }
}

export const getUserByWallet = async (wallet: string) => {
   try {
      const user = await db.user.findUnique({
         where: {
            wallet
         }
      })

      return user

   } catch {
      return null
   }
}

export const getUserByUsername = async (username: string) => {
   try {
      const user = await db.user.findUnique({
         where: {
            username
         }
      })

      return user

   } catch {
      return null
   }
}
