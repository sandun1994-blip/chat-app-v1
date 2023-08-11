import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  try {
    const currentUser = await getCurrentUser();

     console.log(currentUser?.id);
    
    if (!currentUser?.id) {
      return [];
    }
    const conversations = await prisma.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      where:{
        userIds:{
            has:currentUser?.id
        }
      },include:{
        users:true,
        messages:{
            include:{
                seen:true,
                sender:true
            }
        }
      }
    });
    console.log('run');
    
console.log(conversations.length,'conversations');

    return conversations

  } catch (error) {
    console.log(error);
    
    return [];
  }
};
export default getConversations
