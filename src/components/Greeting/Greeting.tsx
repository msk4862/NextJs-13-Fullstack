import { cookies } from 'next/headers'

import { Button } from '@components/Button'
import { Card } from '@components/Card'
import { delay } from '@lib/async'
import { getUserFromCookie } from '@lib/auth'

const getUserDetails = async () => {
  // adding fake delay
  await delay(4000)

  const user = await getUserFromCookie(cookies())
  return user
}

export const Greeting = async () => {
  const user = await getUserDetails()

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="lg">Today&apos;s Schedule</Button>
      </div>
    </Card>
  )
}
