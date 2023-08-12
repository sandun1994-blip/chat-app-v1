import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const conversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include:{
        messages:{
            include:{
                seen:true
            }
        },
        users:true
      }
    });

    if (!conversation) {
        return new NextResponse('Invalid Id',{status:400})
    }

const lastMessage =conversation.messages[conversation.messages.length-1]

if (!lastMessage) {
    return  NextResponse.json(conversation)
}
const updatedMessage= await prisma?.message.update({
    where:{
        id:lastMessage.id
    },
    include:{
        sender:true,
        seen:true
    },
    data:{
        seen:{
            connect:{
                id:currentUser.id
            }
        }
    }
})
//update

return NextResponse.json(updatedMessage)
  } catch (error: any) {
    console.log(error, "error message _seen");
    return new NextResponse("internal errorr", { status: 500 });
  }
}
