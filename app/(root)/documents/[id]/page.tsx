import CollaborativeRoom from "@/components/CollaborativeRoom"
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Document = async ({ params: { id } }: SearchParamProps ) => {
  const clerkUser = await currentUser();
  console.log(`Here is the results of currentUser: ${clerkUser}`);

  if(!clerkUser) redirect('/sign-in')

    const room = await getDocument({
      roomId: id, 
      userId: clerkUser.emailAddresses[0].emailAddress,
    });


    console.log(`Here is the room: ${room}`);

    console.log(`User accesses readout: ${room.usersAccesses}`);

    if(!room) redirect('/');

    const userIds = Object.keys(room.usersAccesses);
    const users = await getClerkUsers({ userIds });
    // TODO This is the problem. It's not getting anything back, showing undefined so when you attempt to map the data it fails.


    console.log(`Here are the users: ${users}`);
    console.log("User IDs being fetched:", userIds);

    const usersData = users.map((user: User) => ({
      ...user,
      userType: room.usersAccesses[user.email]?.includes('room:write')
        ? 'editor'
        : 'viewer',
    }))


    const currentUserType = room.usersAccesses[clerkUser.
      emailAddresses[0]?.emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  )
}

export default Document