export interface ChatResponseType {
  data: {
    familyMembers: any[];
    id: string;
  };
  message: string;
  success: boolean;
}

export interface ChatListType {
  createdAt: Date;
  id: string;
  image_url: string;
  message: string;
  recepient_id: string;
  sender: Sender;
  sender_id: string;
}

export interface Sender {
  familyMembers: any[];
  id: string;
  profileImage: string;
}
