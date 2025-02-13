import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";

const liveblocks = new Liveblocks({
  secret: "sk_dev_kMmE4ejCOgjzDS7E4-gPbcXs5JDPa-yR0LWJYyKUTN7zPk0PSs2xd1Y2DARPJWZF",
});

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if(!clerkUser) redirect('/sign-in');

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Get the current user from your database
  const user = {
    id: clerkUser?.id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: ''
    }
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds: [],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}