import { Note } from "@/types/note";
import {  nextServer } from "./api";
import { cookies } from 'next/headers';
import { User } from "@/types/user";
import { UpdateUserRequest } from "./clientApi";


export type  AxiosErrorResponse = {
  error: string;
};

export type CreateNoteProps = {
  title: string,
  content: string,
  categoryId: string,
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number,
}

export const fetchNotes = async (
page = 1, perPage: number, search = "", tagId: string | undefined): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search.trim() !== "") {
    params.search = search.trim();
  }
  if (tagId) {
    params.tag = tagId;
  }
const cookieStore = await cookies();
const headers = {
Cookie: cookieStore.toString(),
}
  
  
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params, headers, 
  });
  return res.data;
};




export const createNote = async (data: CreateNoteProps): Promise<Note> => {
  const res = await nextServer.post<Note>(`/notes`, data);
  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const updateMe = async (data: UpdateUserRequest) => {
  const cookieStore = await cookies();
  const res = await nextServer.put<User>('/users/me', data, {
    headers: {
      Cookie: cookieStore.toString(),
    }
  });
  return res.data;
};